import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CardType } from '@/api/card-type/entities';
import { CardTypeRepository } from '@/api/card-type/card-type.repository';
import { CardTypeEnum, GroupTypeEnum } from '@/api/card-type/card-type.enum';

@Injectable()
export class CardTypeSeedService {
  constructor(
    @InjectRepository(CardType) private repository: CardTypeRepository,
  ) {}

  async seedExpressionCardType() {
    const countCardType = await this.repository.count({
      where: { type: CardTypeEnum.EXPRESSION },
    });

    if (!countCardType) {
      await this.repository.save(
        this.repository.create({
          desc: '',
          groupType: GroupTypeEnum.TRANSITION,
          type: CardTypeEnum.EXPRESSION,
          name: 'Expression',
        }),
      );
    }
  }

  async run() {
    await this.seedExpressionCardType();
  }
}
