import {
  OnGatewayInit,
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
} from '@nestjs/websockets';
import {
  UsePipes,
  UseFilters,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import type { Server } from 'socket.io';

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

  async getDefaultFlow(botId: string) {
    const flow = await this.flowService.getDefaultFlowByBotId(botId);

    if (!flow) throw new BadRequestException('Flow not found');

    return flow;
  }

  @SubscribeMessage('start-message')
  async startMessage(client: any, payload: SendMessageDto): Promise<void> {
    const flow = await this.getDefaultFlow(payload.botId);
    await this.stepProcessorService.processStep(flow, payload);
  }

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: SendMessageDto): Promise<void> {
    await this.messageService.createMessage(payload);

    // TODO: Change flow based on payload
    const flow = await this.getDefaultFlow(payload.botId);

    await this.stepProcessorService.processStep(flow, payload);
  }
}
