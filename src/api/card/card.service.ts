import { omit } from 'ramda';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Card } from './entities';
import { CardRepository } from './card.repository';
import { GotCardDto, CreateCardDto, CreatedCardDto } from './dto';

@Injectable()
export class CardService {
  constructor(@InjectRepository(Card) private cardRepository: CardRepository) {}

  public async create({
    nodeId,
    cardTypeId,
  }: CreateCardDto): Promise<CreatedCardDto> {
    const count = await this.cardRepository.count({
      where: { node: { id: nodeId } },
    });

    const createdCard = this.cardRepository.create({
      position: count,
      node: { id: nodeId },
      cardType: { id: cardTypeId },
    });

    const result = await this.cardRepository.save(createdCard);

    return { ...omit(['node', 'cardType'], result), cardTypeId, nodeId };
  }

  public async getAll(nodeId: string): Promise<GotCardDto[]> {
    const cards = await this.cardRepository.find({
      where: { node: { id: nodeId } },
      relations: { cardType: true },
    });

    return cards.map((card) => ({
      ...card,
      nodeId,
      cardTypeId: card.cardType.id,
    }));
  }
}
