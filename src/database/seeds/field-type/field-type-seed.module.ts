import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FieldType } from '@/api/field-type/entities';

import { FieldTypeSeedService } from './field-type-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([FieldType])],
  providers: [FieldTypeSeedService],
})
export class FieldTypeSeedModule {}
