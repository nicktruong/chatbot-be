import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CardType } from './entities';
import { GotCardTypeDto } from './dto';
import { CardTypeEnum } from './card-type.enum';
import { CardTypeRepository } from './card-type.repository';

@Injectable()
export class CardTypeService {
  constructor(
    @InjectRepository(CardType) private cardTypeRepository: CardTypeRepository,
  ) {}

  public async getAll(): Promise<GotCardTypeDto[]> {
    const cardTypes = await this.cardTypeRepository.find();

    return cardTypes;
  }

  public async getByType(type: CardTypeEnum): Promise<GotCardTypeDto> {
    const cardType = await this.cardTypeRepository.findOneBy({ type });

    return cardType;
  }
}
