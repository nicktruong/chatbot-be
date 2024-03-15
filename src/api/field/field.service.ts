import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Field } from './entities';
import { FieldRepository } from './field.repository';
import { UpdateFieldDto, CreateDefaultsDto } from './dto';

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
  }: CreateDefaultsDto): Promise<void> {
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

  public async update(fieldId: string, data: UpdateFieldDto): Promise<void> {
    await this.fieldRepository.update({ id: fieldId }, { value: data.value });
  }

  public async getCardFields(cardId: string): Promise<Field[]> {
    const fields = await this.fieldRepository.find({
      where: { card: { id: cardId } },
      relations: { fieldType: true },
      order: { fieldType: { cardTypesFieldTypes: { position: 'ASC' } } },
    });

    return fields;
  }
}
