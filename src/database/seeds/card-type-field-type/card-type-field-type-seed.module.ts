import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardTypeModule } from '@/api/card-type/card-type.module';
import { FieldTypeModule } from '@/api/field-type/field-type.module';
import { CardTypeFieldType } from '@/api/card-type-field-type/entities';

import { CardTypeFieldTypeSeedService } from './card-type-field-type-seed.service';

@Module({
  imports: [
    CardTypeModule,
    FieldTypeModule,
    TypeOrmModule.forFeature([CardTypeFieldType]),
  ],
  providers: [CardTypeFieldTypeSeedService],
})
export class CardTypeFieldTypeSeedModule {}
