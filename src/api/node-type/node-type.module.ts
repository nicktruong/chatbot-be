import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodeType } from './entities';
import { NodeTypeService } from './node-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([NodeType])],
  controllers: [],
  providers: [NodeTypeService],
  exports: [NodeTypeService],
})
export class NodeTypeModule {}
