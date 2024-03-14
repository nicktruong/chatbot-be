import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Field } from './entities';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';

import { FieldTypeModule } from '../field-type/field-type.module';
import { CardTypeFieldTypeModule } from '../card-type-field-type/card-type-field-type.service.module';

@Module({
  imports: [
    FieldTypeModule,
    CardTypeFieldTypeModule,
    TypeOrmModule.forFeature([Field]),
  ],
  controllers: [FieldController],
  providers: [FieldService],
  exports: [FieldService],
})
export class FieldModule {}
