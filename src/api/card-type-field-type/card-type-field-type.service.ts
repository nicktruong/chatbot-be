import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CardTypeFieldType } from './entities';
import { CardTypeFieldTypeRepository } from './card-type-field-type.repository';

@Injectable()
export class CardTypeFieldTypeService {
  constructor(
    @InjectRepository(CardTypeFieldType)
    private cardTypeFieldTypeRepository: CardTypeFieldTypeRepository,
  ) {}

  public async create({
    position,
    cardTypeId,
    fieldTypeId,
  }: {
    position: number;
    cardTypeId: string;
    fieldTypeId: string;
  }) {
    const createdDependency = this.cardTypeFieldTypeRepository.create({
      position,
      cardType: { id: cardTypeId },
      fieldType: { id: fieldTypeId },
    });

    await this.cardTypeFieldTypeRepository.save(createdDependency);

    return createdDependency;
  }
}
