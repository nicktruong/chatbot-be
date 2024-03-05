import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardType } from './entities';
import { CardTypeRepository } from './card-type.repository';
import { GotCardTypeDto } from './dto';

@Injectable()
export class CardTypeService {
  constructor(
    @InjectRepository(CardType) private cardTypeRepository: CardTypeRepository,
  ) {}

  public async getAll(): Promise<GotCardTypeDto[]> {
    const cardTypes = await this.cardTypeRepository.find();

    return cardTypes;
  }
}
