import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FlowType } from './entities';
import { FlowTypeService } from './flow-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([FlowType])],
  controllers: [],
  providers: [FlowTypeService],
  exports: [FlowTypeService],
})
export class FlowTypeModule {}
