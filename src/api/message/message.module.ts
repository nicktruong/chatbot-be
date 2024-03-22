import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message, Schedule } from './entities';
import { MessageController } from './message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Schedule])],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
