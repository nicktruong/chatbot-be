import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatGateway } from './chat.gateway';

import { MessageModule } from '../message/message.module';

@Module({
  imports: [MessageModule],
  controllers: [],
  providers: [ChatGateway],
  exports: [],
})
export class ChatModule {}
