import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodeType } from '@/api/node-type/entities';

import { NodeTypeSeedService } from './node-type-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([NodeType])],
  providers: [NodeTypeSeedService],
})
export class NodeTypeSeedModule {}
