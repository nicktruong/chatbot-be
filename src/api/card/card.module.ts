import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Card } from './entities';
import { CardService } from './card.service';
import { CardController } from './card.controller';

import { FieldModule } from '../field/field.module';

@Module({
  imports: [FieldModule, TypeOrmModule.forFeature([Card])],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
