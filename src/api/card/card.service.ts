import { omit } from 'ramda';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { Card } from './entities';
import { CreateCardDto } from './dto';
import { CardRepository } from './card.repository';

import { FieldService } from '../field/field.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: CardRepository,
    @Inject(forwardRef(() => FieldService))
    private fieldService: FieldService,
  ) {}

  public async checkExist(id: string): Promise<boolean> {
    return this.cardRepository.exists({ where: { id } });
  }

  public async create({ nodeId, cardTypeId }: CreateCardDto): Promise<Card> {
    const count = await this.cardRepository.count({
      where: { node: { id: nodeId } },
    });

    const createdCard = this.cardRepository.create({
      position: count,
      node: { id: nodeId },
      cardType: { id: cardTypeId },
    });

    await this.fieldService.createDefaults({
      cardId: createdCard.id,
      cardTypeId: cardTypeId,
    });

    await this.cardRepository.save(createdCard);

    return createdCard;
  }

  public async getAll(nodeId: string): Promise<Card[]> {
    const cards = await this.cardRepository.find({
      where: { node: { id: nodeId } },
      relations: { cardType: true },
      order: { position: 'ASC' },
    });

    return cards;
  }
}
