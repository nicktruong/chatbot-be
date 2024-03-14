import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from './entities';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
