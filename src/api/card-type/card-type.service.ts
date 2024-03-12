import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CardType } from './entities';
import { CardTypeEnum } from './card-type.enum';
import { CardTypeRepository } from './card-type.repository';

@Injectable()
export class CardTypeService {
  constructor(
    @InjectRepository(CardType) private cardTypeRepository: CardTypeRepository,
  ) {}

  public async checkExist(id: string): Promise<boolean> {
    return this.cardTypeRepository.exists({ where: { id } });
  }

  public async getAll(): Promise<CardType[]> {
    const cardTypes = await this.cardTypeRepository.find();

    return cardTypes;
  }

  public async getByType(type: CardTypeEnum): Promise<CardType> {
    const cardType = await this.cardTypeRepository.findOneBy({ type });

    return cardType;
  }
}
