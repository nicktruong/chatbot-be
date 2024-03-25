import { Module } from '@nestjs/common';

import { CardModule } from '@/api/card/card.module';
import { EdgeModule } from '@/api/edge/edge.module';
import { NodeModule } from '@/api/node/node.module';
import { FieldModule } from '@/api/field/field.module';
import { MessageModule } from '@/api/message/message.module';

import { StepProcessorService } from './step-processor.service';

import { NlpModule } from '../nlp/nlp.module';
import { EvalModule } from '../eval/eval.module';
import { LexerModule } from '../lexer/lexer.module';

@Module({
  imports: [
    NlpModule,
    NodeModule,
    CardModule,
    EdgeModule,
    EvalModule,
    FieldModule,
    LexerModule,
    MessageModule,
  ],
  controllers: [],
  providers: [StepProcessorService],
  exports: [StepProcessorService],
})
export class StepProcessorModule {}
