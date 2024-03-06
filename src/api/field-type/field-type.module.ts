import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FieldType } from './entities';
import { FieldTypeService } from './field-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([FieldType])],
  controllers: [],
  providers: [FieldTypeService],
  exports: [FieldTypeService],
})
export class FieldTypeModule {}
