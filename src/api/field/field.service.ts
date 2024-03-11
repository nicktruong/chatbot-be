import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Field } from './entities';
import { CreateFieldDto, UpdateFieldDto, UpdatedFieldDto } from './dto';
import { FieldRepository } from './field.repository';

import { FieldTypeService } from '../field-type/field-type.service';

@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(Field) private fieldRepository: FieldRepository,
    private fieldTypeService: FieldTypeService,
  ) {}

  public async createDefaults({
    cardId,
    cardTypeId,
  }: {
    cardId: string;
    cardTypeId: string;
  }): Promise<void> {
    const fieldTypes = await this.fieldTypeService.findByCardTypeId(cardTypeId);

    await Promise.all(
      fieldTypes.map((fieldType) =>
        this.fieldRepository.save(
          this.fieldRepository.create({
            value: '',
            cardId,
            fieldTypeId: fieldType.id,
          }),
        ),
      ),
    );
  }

  public async create(data: CreateFieldDto): Promise<Field> {
    const fieldType = await this.fieldTypeService.getByType(data.fieldType);

    const createdField = this.fieldRepository.create({
      value: data.value,
      cardId: data.cardId,
      fieldTypeId: fieldType.id,
    });

    const result = await this.fieldRepository.save(createdField);

    return result;
  }

  public async update(data: UpdateFieldDto): Promise<UpdatedFieldDto> {
    await this.fieldRepository.update(
      { id: data.fieldId },
      { value: data.value },
    );

    return data;
  }

  public async getCardFields(cardId: string): Promise<Field[]> {
    const fields = await this.fieldRepository.find({
      where: { cardId },
      relations: { fieldType: true },
      order: { fieldType: { cardTypesFieldTypes: { position: 'ASC' } } },
    });

    return fields;
  }
}
