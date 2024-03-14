import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bot } from './entities';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';

import { FlowModule } from '../flow/flow.module';
import { NodeModule } from '../node/node.module';
import { NodeTypeModule } from '../node-type/node-type.module';

@Module({
  imports: [
    FlowModule,
    NodeModule,
    NodeTypeModule,
    TypeOrmModule.forFeature([Bot]),
  ],
  controllers: [BotController],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
