import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Node } from './entities';
import { NodeService } from './node.service';
import { NodeController } from './node.controller';

import { FlowModule } from '../flow/flow.module';
import { NodeTypeModule } from '../node-type/node-type.module';

@Module({
  imports: [FlowModule, NodeTypeModule, TypeOrmModule.forFeature([Node])],
  controllers: [NodeController],
  providers: [NodeService],
  exports: [NodeService],
})
export class NodeModule {}
