import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CardType } from '@/api/card-type/entities';
import { CardTypeRepository } from '@/api/card-type/card-type.repository';
import { CardTypeEnum, GroupTypeEnum } from '@/api/card-type/card-type.enum';

@Injectable()
export class CardTypeSeedService {
  cards = [
    {
      desc: '',
      name: 'Expression',
      type: CardTypeEnum.EXPRESSION,
      groupType: GroupTypeEnum.TRANSITION,
    },
    {
      desc: '',
      name: 'Number',
      type: CardTypeEnum.NUMBER,
      groupType: GroupTypeEnum.CAPTURE_INFO,
    },
  ];

  constructor(
    @InjectRepository(CardType) private repository: CardTypeRepository,
  ) {}

  async seedCardType({
    desc,
    name,
    type,
    groupType,
  }: {
    desc: string;
    name: string;
    type: CardTypeEnum;
    groupType: GroupTypeEnum;
  }) {
    const countCardType = await this.repository.count({
      where: { type },
    });

    if (!countCardType) {
      // Don't use .create([]) here as we may modify cards
      await this.repository.save(
        this.repository.create({
          desc,
          name,
          type,
          groupType,
        }),
      );
    }
  }

  async run() {
    await Promise.all(this.cards.map((card) => this.seedCardType(card)));
  }
}
