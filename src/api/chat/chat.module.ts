import { Module } from '@nestjs/common';

import { EvalModule } from '@/modules/eval/eval.module';
import { LexerModule } from '@/modules/lexer/lexer.module';

import { ChatGateway } from './chat.gateway';

import { FlowModule } from '../flow/flow.module';
import { NodeModule } from '../node/node.module';
import { CardModule } from '../card/card.module';
import { EdgeModule } from '../edge/edge.module';
import { FieldModule } from '../field/field.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    FlowModule,
    NodeModule,
    CardModule,
    EdgeModule,
    EvalModule,
    FieldModule,
    LexerModule,
    MessageModule,
  ],
  controllers: [],
  providers: [ChatGateway],
  exports: [],
})
export class ChatModule {}
