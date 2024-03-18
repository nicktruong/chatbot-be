import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';

import { Card } from './entities';
import { CardService } from './card.service';
import { CardController } from './card.controller';

import { FieldModule } from '../field/field.module';

@Module({
  imports: [forwardRef(() => FieldModule), TypeOrmModule.forFeature([Card])],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
