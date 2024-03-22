import {
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';

import { getPipeOptions } from '@/config';
import { WsValidatorExceptionsFilter } from '@/filters';

import { NlpService } from '@/modules/nlp/nlp.service';
import { LexerService } from '@/modules/lexer/lexer.service';
import { EvalService, Ops } from '@/modules/eval/eval.service';

import type { SocketServer } from './chat.interfaces';

import { CardOrNode } from '../edge/enums';
import { SendMessageDto } from '../message/dto';
import { FlowService } from '../flow/flow.service';
import { NodeService } from '../node/node.service';
import { CardService } from '../card/card.service';
import { EdgeService } from '../edge/edge.service';
import { FieldService } from '../field/field.service';
import { CardTypeEnum } from '../card-type/card-type.enum';
import { MessageService } from '../message/message.service';
import { FieldTypeEnum } from '../field-type/field-type.enum';

// TODO: Validate accessToken
@WebSocketGateway({ namespace: 'chat', cors: true })
@UsePipes(new ValidationPipe(getPipeOptions()))
@UseFilters(WsValidatorExceptionsFilter)
export class ChatGateway {
  @WebSocketServer()
  server: SocketServer;

  variables: Record<string, any> = {};

  constructor(
    private nlpService: NlpService,
    private flowService: FlowService,
    private nodeService: NodeService,
    private cardService: CardService,
    private edgeService: EdgeService,
    private evalService: EvalService,
    private fieldService: FieldService,
    private lexerService: LexerService,
    private messageService: MessageService,
  ) {}

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: SendMessageDto): Promise<void> {
    await this.messageService.createMessage(payload);

    // TODO: Change flow based on payload
    const flow = await this.flowService.getDefaultFlowByBotId(payload.botId);
    if (!flow) return;

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
        const edge = await this.edgeService.getByCardOrNodeId(
          nodes[nodeIndex].id,
          CardOrNode.NODE,
        );

        if (edge) {
          const targetNode = nodes.find(
            (node) => node.id === edge.targetNodeId,
          );

          if (targetNode.position === nodePosition) {
            // If no card and current nodePosition is the target node
            // => return to prevent infinite loop
            return;
          }

          nodePosition = targetNode.position;
          cardPosition = 0;
          this.server.emit('step', `${nodePosition}-${cardPosition}`);

          continue;
        }

        return;
      }

      const fields = await this.fieldService.getCardFields(card.id);
      this.server.emit('requireAnswer', false);

      switch (card.cardType.type) {
        case CardTypeEnum.EXPRESSION: {
          const field = fields.find(
            (field) => field.fieldType.type === FieldTypeEnum.CONDITION,
          );

          // Get the target node and transition to there
          const edge = await this.edgeService.getByCardOrNodeId(
            card.id,
            CardOrNode.CARD,
          );

          // If no edge then continue the next card
          if (!edge) {
            cardPosition++;
            this.server.emit('step', `${nodePosition}-${cardPosition}`);
            break;
          }

          // Evaluate expression condition before running the next step
          const lexer = this.lexerService.parseCondition(field.value);

          // TODO: Support complex arithmetic expressions
          const tokens: any[] = [];

          for (const token of lexer) {
            switch (token.type) {
              case 'number':
                // Add to array
                tokens.push(+token.value);
                break;
              case 'variable':
                // Get variable value from this.variables then add to array
                tokens.push(this.variables[token.value]);
                break;
              case 'boolean':
                tokens.push(token.value);
                break;
              case 'operator':
                // Add to array
                tokens.push(token.value as Ops);
                break;
              default:
                break;
            }
          }

          const result = this.evalService.exe(...tokens);

          if (!result) {
            cardPosition++;
            this.server.emit('step', `${nodePosition}-${cardPosition}`);
            break;
          }

          const targetNode = nodes.find(
            (node) => node.id === edge.targetNodeId,
          );

          nodePosition = targetNode.position;
          cardPosition = 0;
          this.server.emit('step', `${nodePosition}-${cardPosition}`);
          break;
        }
        case CardTypeEnum.NUMBER: {
          // If message is not an answer then emit to user and ask for a number
          if (!payload.answer) {
            const field = fields.find(
              (field) => field.fieldType.type === FieldTypeEnum.NUMBER_QUESTION,
            );

            const message = await this.messageService.createMessage({
              value: field.value,
              botId: payload.botId,
              sender: payload.botId,
              receiver: payload.sender,
              clientId: payload.clientId,
            });

            this.server.emit('requireAnswer', true);
            this.server.emit('message', message);

            return;
          }

          // If message is an answer then store it to temporary variables
          // TODO: If step is persisted then store variable in database
          // TODO: NLP extract entity
          const variableName = fields.find(
            (field) => field.fieldType.type === FieldTypeEnum.STORE_RESULT_IN,
          ).value;

          this.variables[variableName] = await this.nlpService.extractEntity(
            payload.value,
          );

          cardPosition++;

          this.server.emit('step', `${nodePosition}-${cardPosition}`);
          break;
        }
        case CardTypeEnum.TEXT: {
          const field = fields.find(
            (field) => field.fieldType.type === FieldTypeEnum.MESSAGE_TO_SEND,
          );

          const message = await this.messageService.createMessage({
            value: field.value,
            botId: payload.botId,
            sender: payload.botId,
            receiver: payload.sender,
            clientId: payload.clientId,
          });

          this.server.emit('message', message);

          cardPosition++;

          this.server.emit('step', `${nodePosition}-${cardPosition}`);
          break;
        }
        default:
          break;
      }
    }
  }
}
