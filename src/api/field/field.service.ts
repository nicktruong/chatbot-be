import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CreateFieldDto,
  UpdateFieldDto,
  UpdatedFieldDto,
  CreateDefaultFieldsDto,
} from './dto';
import { Field } from './entities';
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
  }: CreateDefaultFieldsDto): Promise<void> {
    const fieldTypes = await this.fieldTypeService.findByCardTypeId(cardTypeId);

    await Promise.all(
      fieldTypes.map((fieldType) =>
        this.fieldRepository.save(
          this.fieldRepository.create({
            value: '',
            card: { id: cardId },
            fieldType: { id: fieldType.id },
          }),
        ),
      ),
    );
  }

  public async create(data: CreateFieldDto): Promise<Field> {
    const fieldType = await this.fieldTypeService.getByType(data.fieldType);

    const createdField = this.fieldRepository.create({
      value: data.value,
      card: { id: data.cardId },
      fieldType: { id: fieldType.id },
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
      where: { card: { id: cardId } },
      relations: { card: true, fieldType: true },
      order: { fieldType: { cardTypesFieldTypes: { position: 'ASC' } } },
    });

    return fields;
  }
}
