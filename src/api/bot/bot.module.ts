import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bot } from './entities';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';

import { FlowModule } from '../flow/flow.module';

@Module({
  imports: [FlowModule, TypeOrmModule.forFeature([Bot])],
  controllers: [BotController],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
