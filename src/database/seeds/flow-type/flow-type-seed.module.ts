import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FlowType } from '@/api/flow-type/entities';

import { FlowTypeSeedService } from './flow-type-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([FlowType])],
  providers: [FlowTypeSeedService],
})
export class FlowTypeSeedModule {}
