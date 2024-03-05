import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardType } from './entities';
import { CardTypeController } from './card-type.controller';
import { CardTypeService } from './card-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardType])],
  controllers: [CardTypeController],
  providers: [CardTypeService],
  exports: [CardTypeService],
})
export class CardTypeModule {}
