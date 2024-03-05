import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardType } from '@/api/card-type/entities';

import { CardTypeSeedService } from './card-type-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardType])],
  providers: [CardTypeSeedService],
})
export class CardTypeSeedModule {}
