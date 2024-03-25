import { Injectable } from '@nestjs/common';

import { Flow } from '@/api/flow/entities';
import { Card } from '@/api/card/entities';
import { Node } from '@/api/node/entities';
import { CardOrNode } from '@/api/edge/enums';
import { NodeService } from '@/api/node/node.service';
import { CardService } from '@/api/card/card.service';
import { EdgeService } from '@/api/edge/edge.service';
import { FieldService } from '@/api/field/field.service';
import { SocketServer } from '@/api/chat/chat.interfaces';
import { CardTypeEnum } from '@/api/card-type/card-type.enum';
import { MessageService } from '@/api/message/message.service';
import { FieldTypeEnum } from '@/api/field-type/field-type.enum';
import { CreateMessageDto, SendMessageDto } from '@/api/message/dto';

import { NlpService } from '../nlp/nlp.service';
import { EvalService } from '../eval/eval.service';
import { LexerService } from '../lexer/lexer.service';

@Injectable()
export class StepProcessorService {
  variables: Record<string, any> = {};

  constructor(
    private nlpService: NlpService,
    private nodeService: NodeService,
    private cardService: CardService,
    private edgeService: EdgeService,
    private evalService: EvalService,
    private fieldService: FieldService,
    private lexerService: LexerService,
    private messageService: MessageService,
  ) {}

  async sendMessage(
    server: SocketServer,
    data: CreateMessageDto,
  ): Promise<void> {
    const message = await this.messageService.createMessage(data);
    server.emit('message', message);
  }

  async processStep(server: SocketServer, flow: Flow, payload: SendMessageDto) {
    // currentStep is created in the form `${nodePos}-${cardPos}`
    // in order to easily retrieve the current card logic
    const [nodePos, cardPos] = payload.currentStep.split('-');

    let nodePosition = +nodePos,
      cardPosition = +cardPos;

    // TODO: Cache redis
    const nodes = await this.nodeService.getAll(flow.id);
    const cardsOfNodes = await Promise.all(
      nodes.map((node) => this.cardService.getAll(node.id)),
    );

    while (true) {
      const nodeIndex = nodes.findIndex(
        (node) => node.position === nodePosition,
      );

      if (nodeIndex === -1) return;

      const card = cardsOfNodes[nodeIndex].find(
        (card) => card.position === cardPosition,
      );

      if (!card) {
        const edge = await this.edgeService.getOneByCardOrSourceNodeId(
          nodes[nodeIndex].id,
          CardOrNode.NODE,
        );

        // If there isn't any card left but still have an edge between nodes
        // Transition to the target node
        if (edge) {
          const targetNode = nodes.find(
            (node) => node.id === edge.targetNodeId,
          );

          cardPosition = 0;
          nodePosition = targetNode.position;
          server.emit('step', `${nodePosition}-${cardPosition}`);

          continue;
        }

        return;
      }

      server.emit('requireAnswer', false);

      switch (card.cardType.type) {
        case CardTypeEnum.EXPRESSION: {
          ({ cardPosition, nodePosition } = await this.processExpressionCard({
            card,
            nodes,
            cardPosition,
            nodePosition,
          }));

          break;
        }
        case CardTypeEnum.NUMBER: {
          ({ cardPosition } = await this.processNumberCard({
            card,
            server,
            payload,
            cardPosition,
          }));

          break;
        }
        case CardTypeEnum.TEXT: {
          ({ cardPosition } = await this.processTextCard({
            card,
            server,
            payload,
            cardPosition,
          }));

          break;
        }
        default:
          break;
      }

      server.emit('step', `${nodePosition}-${cardPosition}`);

      if (!payload.answer && card.cardType.type === CardTypeEnum.NUMBER) return;
    }
  }

  async processExpressionCard({
    card,
    nodes,
    cardPosition,
    nodePosition,
  }: {
    card: Card;
    nodes: Node[];
    cardPosition: number;
    nodePosition: number;
  }): Promise<{ nodePosition: number; cardPosition: number }> {
    const [field] = await this.fieldService.getCardFields(card.id, {
      fieldType: { type: FieldTypeEnum.CONDITION },
    });

    // Get the target node and transition to there
    const edge = await this.edgeService.getOneByCardOrSourceNodeId(
      card.id,
      CardOrNode.CARD,
    );

    // If no edge then continue the next card
    if (!edge) {
      cardPosition++;
      return { nodePosition, cardPosition };
    }

    // Evaluate expression condition before running the next step
    const lexer = this.lexerService.parseCondition(field.value);

    // TODO: Support complex arithmetic expressions
    const tokens: any[] = [];

    for (const token of lexer) {
      switch (token.type) {
        case 'variable':
          // Get variable value from this.variables then add to array
          tokens.push(this.variables[token.value]);
          break;
        case 'number':
          tokens.push(+token.value);
          break;
        case 'boolean':
        case 'operator':
          tokens.push(token.value);
          break;
        default:
          break;
      }
    }

    const result = this.evalService.exe(...tokens);

    if (!result) {
      cardPosition++;

      return { nodePosition, cardPosition };
    }

    const targetNode = nodes.find((node) => node.id === edge.targetNodeId);

    cardPosition = 0;
    nodePosition = targetNode.position;
    return { nodePosition, cardPosition };
  }

  async processNumberCard({
    card,
    server,
    payload,
    cardPosition,
  }: {
    card: Card;
    server: SocketServer;
    cardPosition: number;
    payload: SendMessageDto;
  }): Promise<{ cardPosition: number }> {
    // If message is not an answer then emit to user and ask for a number
    if (!payload.answer) {
      const [field] = await this.fieldService.getCardFields(card.id, {
        fieldType: { type: FieldTypeEnum.NUMBER_QUESTION },
      });

      await this.sendMessage(server, {
        value: field.value,
        botId: payload.botId,
        sender: payload.botId,
        receiver: payload.sender,
        clientId: payload.clientId,
      });

      server.emit('requireAnswer', true);

      return { cardPosition };
    }

    // If message is an answer then store it to temporary variables
    // TODO: If step is persisted then store variable in database
    // TODO: NLP extract entity
    const [field] = await this.fieldService.getCardFields(card.id, {
      fieldType: { type: FieldTypeEnum.STORE_RESULT_IN },
    });

    this.variables[field.value] = await this.nlpService.extractEntity(
      payload.value,
    );

    cardPosition++;

    return { cardPosition };
  }

  async processTextCard({
    card,
    server,
    payload,
    cardPosition,
  }: {
    card: Card;
    server: SocketServer;
    cardPosition: number;
    payload: SendMessageDto;
  }): Promise<{ cardPosition: number }> {
    const [field] = await this.fieldService.getCardFields(card.id, {
      fieldType: { type: FieldTypeEnum.MESSAGE_TO_SEND },
    });

    await this.sendMessage(server, {
      value: field.value,
      botId: payload.botId,
      sender: payload.botId,
      receiver: payload.sender,
      clientId: payload.clientId,
    });

    cardPosition++;

    return { cardPosition };
  }
}
