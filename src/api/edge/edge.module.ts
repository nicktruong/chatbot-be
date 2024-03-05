import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Edge } from './entities';
import { EdgeService } from './edge.service';
import { EdgeController } from './edge.controller';

import { NodeModule } from '../node/node.module';

@Module({
  imports: [NodeModule, TypeOrmModule.forFeature([Edge])],
  controllers: [EdgeController],
  providers: [EdgeService],
  exports: [EdgeService],
})
export class EdgeModule {}
