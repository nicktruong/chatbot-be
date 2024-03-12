import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FieldType } from './entities';
import { FieldTypeEnum } from './field-type.enum';
import { FieldTypeRepository } from './field-type.repository';

@Injectable()
export class FieldTypeService {
  constructor(
    @InjectRepository(FieldType)
    private fieldTypeRepository: FieldTypeRepository,
  ) {}

  public async getByType(type: FieldTypeEnum): Promise<FieldType> {
    const fieldType = await this.fieldTypeRepository.findOneBy({ type });

    return fieldType;
  }

  public async findByCardTypeId(cardTypeId: string): Promise<FieldType[]> {
    const fieldTypes = await this.fieldTypeRepository.find({
      where: { cardTypesFieldTypes: { cardType: { id: cardTypeId } } },
    });

    return fieldTypes;
  }
}
