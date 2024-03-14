import {
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';

import { getPipeOptions } from '@/config';
import { WsValidatorExceptionsFilter } from '@/filters';

import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from './chat.interfaces';
import { SendMessageDto } from './dto';
import { ChatService } from './chat.service';

export type SocketServer = Server<ClientToServerEvents, ServerToClientEvents>;

@WebSocketGateway({ namespace: 'chat' })
@UsePipes(new ValidationPipe(getPipeOptions()))
@UseFilters(WsValidatorExceptionsFilter)
export class ChatGateway {
  @WebSocketServer()
  server: SocketServer;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: SendMessageDto): Promise<string> {
    return 'Hello world!';
  }
}
