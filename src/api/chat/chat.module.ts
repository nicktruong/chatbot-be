import { Module } from '@nestjs/common';

import { StepProcessorModule } from '@/modules/step-processor/step-processor.module';

import { ChatGateway } from './chat.gateway';

import { FlowModule } from '../flow/flow.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [FlowModule, MessageModule, StepProcessorModule],
  controllers: [],
  providers: [ChatGateway],
  exports: [],
})
export class ChatModule {}
