import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Flow } from './entities';
import { FlowService } from './flow.service';
import { FlowController } from './flow.controller';

import { FlowTypeModule } from '../flow-type/flow-type.module';

@Module({
  imports: [FlowTypeModule, TypeOrmModule.forFeature([Flow])],
  controllers: [FlowController],
  providers: [FlowService],
  exports: [FlowService],
})
export class FlowModule {}
