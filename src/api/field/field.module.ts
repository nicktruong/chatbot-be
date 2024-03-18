import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';

import { Field } from './entities';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';

import { CardModule } from '../card/card.module';
import { CardTypeModule } from '../card-type/card-type.module';
import { FieldTypeModule } from '../field-type/field-type.module';

@Module({
  imports: [
    CardTypeModule,
    FieldTypeModule,
    forwardRef(() => CardModule),
    TypeOrmModule.forFeature([Field]),
  ],
  controllers: [FieldController],
  providers: [FieldService],
  exports: [FieldService],
})
export class FieldModule {}
