import {
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';

import { getPipeOptions } from '@/config';
import { WsValidatorExceptionsFilter } from '@/filters';

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

@WebSocketGateway({ namespace: 'chat', cors: true })
@UsePipes(new ValidationPipe(getPipeOptions()))
@UseFilters(WsValidatorExceptionsFilter)
export class ChatGateway {
  @WebSocketServer()
  server: SocketServer;

  variables: Record<string, any> = {};

  constructor(
    private flowService: FlowService,
    private nodeService: NodeService,
    private cardService: CardService,
    private edgeService: EdgeService,
    private fieldService: FieldService,
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

      if (!card) return;

      this.server.emit('requireAnswer', false);

      switch (card.cardType.type) {
        case CardTypeEnum.EXPRESSION: {
          // Get the target node and transition to there
          const edge = await this.edgeService.getByCardOrNodeId(
            card.id,
            CardOrNode.CARD,
          );

          // If no edge then continue the next card
          if (!edge) {
            cardPosition++;
            this.server.emit('step', `${nodePosition}-${cardPosition}`);
            return;
          }

          // TODO: Evaluate expression condition before running the next step

          const targetNode = nodes.find(
            (node) => node.id === edge.targetNodeId,
          );

          nodePosition = targetNode.position;
          cardPosition = 0;
          this.server.emit('step', `${nodePosition}-${cardPosition}`);
          break;
        }
        case CardTypeEnum.NUMBER: {
          const fields = await this.fieldService.getCardFields(card.id);

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
          const variableName = fields.find(
            (field) => field.fieldType.type === FieldTypeEnum.STORE_RESULT_IN,
          ).value;

          this.variables[variableName] = payload.value;

          cardPosition++;

          this.server.emit('step', `${nodePosition}-${cardPosition}`);
          break;
        }
        case CardTypeEnum.TEXT: {
          const fields = await this.fieldService.getCardFields(card.id);

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
