import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardTypeFieldType } from './entities';
import { CardTypeFieldTypeService } from './card-type-field-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardTypeFieldType])],
  controllers: [],
  providers: [CardTypeFieldTypeService],
  exports: [CardTypeFieldTypeService],
})
export class CardTypeFieldTypeModule {}
