import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardType } from './entities';
import { CardTypeService } from './card-type.service';
import { CardTypeController } from './card-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CardType])],
  controllers: [CardTypeController],
  providers: [CardTypeService],
  exports: [CardTypeService],
})
export class CardTypeModule {}
