import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FlowTypeNodeTypeSeedService } from './flow-type-node-type-seed.service';

@Module({
  imports: [ConfigModule],
  providers: [FlowTypeNodeTypeSeedService],
})
export class FlowTypeNodeTypeSeedModule {}
