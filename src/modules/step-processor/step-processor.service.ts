import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { Flow } from '@/api/flow/entities';
import { Card } from '@/api/card/entities';
import { Node } from '@/api/node/entities';
import { CardOrNode } from '@/api/edge/enums';
import { NodeService } from '@/api/node/node.service';
import { CardService } from '@/api/card/card.service';
import { EdgeService } from '@/api/edge/edge.service';
import { FieldService } from '@/api/field/field.service';
import { CardTypeEnum } from '@/api/card-type/card-type.enum';
import { MessageService } from '@/api/message/message.service';
import { FieldTypeEnum } from '@/api/field-type/field-type.enum';
import { CreateMessageDto, SendMessageDto } from '@/api/message/dto';

import { NlpService } from '../nlp/nlp.service';
import { EvalService } from '../eval/eval.service';
import { LexerService } from '../lexer/lexer.service';
import { SocketService } from '../socket/socket.service';

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
    private socketService: SocketService,
    private messageService: MessageService,
  ) {}

  async sendMessage(data: CreateMessageDto): Promise<void> {
    const message = await this.messageService.createMessage(data);
    this.socketService.socket.emit('message', message);
  }

  async processStep(flow: Flow, payload: SendMessageDto) {
    // currentStep is created in the form `${nodePos}-${cardPos}`
    // in order to easily retrieve the current card logic
    const [nodePos, cardPos] = payload.currentStep.split('-');

    let nodePosition = +nodePos,
      cardPosition = +cardPos;

    // TODO: Cache redis
    const nodes = await this.nodeService.getAll(flow.id, {
      cards: { cardType: true },
    });

    while (true) {
      if (!nodes[nodePosition]) return;

      const card = nodes[nodePosition].cards[cardPosition];

      if (!card) {
        const result = await this.handleNodeTransition(nodes, nodePosition);
        if (!result) return;

        ({ cardPosition, nodePosition } = result);
        continue;
      }

      this.socketService.socket.emit('requireAnswer', false);

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
            payload,
            cardPosition,
          }));

          break;
        }
        case CardTypeEnum.TEXT: {
          ({ cardPosition } = await this.processTextCard({
            card,
            payload,
            cardPosition,
          }));

          break;
        }
        default:
          break;
      }

      this.socketService.socket.emit('step', `${nodePosition}-${cardPosition}`);

      if (!payload.answer && card.cardType.type === CardTypeEnum.NUMBER) return;
    }
  }

  async handleNodeTransition(nodes: Node[], nodePosition: number) {
    const edge = await this.edgeService.getOneByCardOrSourceNodeId(
      nodes[nodePosition].id,
      CardOrNode.NODE,
    );

    const targetNode = nodes.find((node) => node.id === edge?.targetNodeId);

    if (!edge || !targetNode) return;

    const cardPosition = 0;
    nodePosition = targetNode.position;
    this.socketService.socket.emit('step', `${nodePosition}-${cardPosition}`);

    return { cardPosition, nodePosition };
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
    const tokens = Array.from(lexer);

    const regex = new RegExp(new RegExp(Object.keys(this.variables).join('|')));

    tokens
      .filter((token: any) => token.type === 'variable')
      .forEach((token: any) => {
        const valid = regex.test(token.value);

        if (!valid) {
          throw new InternalServerErrorException('Invalid custom code');
        }
      });

    const result = await this.evalService.eval(field.value, this.variables);

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
    payload,
    cardPosition,
  }: {
    card: Card;
    cardPosition: number;
    payload: SendMessageDto;
  }): Promise<{ cardPosition: number }> {
    // If message is not an answer then emit to user and ask for a number
    if (!payload.answer) {
      const [field] = await this.fieldService.getCardFields(card.id, {
        fieldType: { type: FieldTypeEnum.NUMBER_QUESTION },
      });

      await this.sendMessage({
        value: field.value,
        botId: payload.botId,
        sender: payload.botId,
        receiver: payload.sender,
        clientId: payload.clientId,
      });

      this.socketService.socket.emit('requireAnswer', true);

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
    payload,
    cardPosition,
  }: {
    card: Card;
    cardPosition: number;
    payload: SendMessageDto;
  }): Promise<{ cardPosition: number }> {
    const [field] = await this.fieldService.getCardFields(card.id, {
      fieldType: { type: FieldTypeEnum.MESSAGE_TO_SEND },
    });

    await this.sendMessage({
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