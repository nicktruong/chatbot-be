import {
  OnGatewayInit,
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
} from '@nestjs/websockets';
import type { Server } from 'socket.io';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';

import { getPipeOptions } from '@/config';
import { WsValidatorExceptionsFilter } from '@/filters';

import { SendMessageDto } from '@/api/message/dto';
import { FlowService } from '@/api/flow/flow.service';
import { MessageService } from '@/api/message/message.service';

import { SocketService } from '@/modules/socket/socket.service';
import { StepProcessorService } from '@/modules/step-processor/step-processor.service';

// TODO: Validate accessToken
@WebSocketGateway({ namespace: 'app-chat', cors: true })
@UsePipes(new ValidationPipe(getPipeOptions()))
@UseFilters(WsValidatorExceptionsFilter)
export class AppGateway implements OnGatewayInit {
  @WebSocketServer() public server: Server;

  constructor(
    private flowService: FlowService,
    private socketService: SocketService,
    private messageService: MessageService,
    private stepProcessorService: StepProcessorService,
  ) {}

  afterInit(server: Server) {
    this.socketService.socket = server;
  }

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: SendMessageDto): Promise<void> {
    await this.messageService.createMessage(payload);

    // TODO: Change flow based on payload
    const flow = await this.flowService.getDefaultFlowByBotId(payload.botId);
    if (!flow) return;

    await this.stepProcessorService.processStep(flow, payload);
  }
}
