import {
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';

import { getPipeOptions } from '@/config';
import { WsValidatorExceptionsFilter } from '@/filters';

import { StepProcessorService } from '@/modules/step-processor/step-processor.service';

import type { SocketServer } from './chat.interfaces';

import { SendMessageDto } from '../message/dto';
import { FlowService } from '../flow/flow.service';
import { MessageService } from '../message/message.service';

// TODO: Validate accessToken
@WebSocketGateway({ namespace: 'chat', cors: true })
@UsePipes(new ValidationPipe(getPipeOptions()))
@UseFilters(WsValidatorExceptionsFilter)
export class ChatGateway {
  @WebSocketServer()
  server: SocketServer;

  variables: Record<string, any> = {};

  constructor(
    private flowService: FlowService,
    private messageService: MessageService,
    private stepProcessorService: StepProcessorService,
  ) {}

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: SendMessageDto): Promise<void> {
    await this.messageService.createMessage(payload);

    // TODO: Change flow based on payload
    const flow = await this.flowService.getDefaultFlowByBotId(payload.botId);
    if (!flow) return;

    await this.stepProcessorService.processStep(this.server, flow, payload);
  }
}
