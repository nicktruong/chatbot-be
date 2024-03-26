import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message, Schedule } from './entities';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';

import { SocketModule } from '@/modules/socket/socket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Schedule]), SocketModule],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
