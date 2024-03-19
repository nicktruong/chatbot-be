import {
  Inject,
  Injectable,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Field } from './entities';
import { FieldRepository } from './field.repository';
import { UpdateFieldDto, CreateDefaultsDto } from './dto';

import { CardService } from '../card/card.service';
import { CardTypeService } from '../card-type/card-type.service';
import { FieldTypeService } from '../field-type/field-type.service';

@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(Field) private fieldRepository: FieldRepository,
    @Inject(forwardRef(() => CardService))
    private cardService: CardService,
    private cardTypeService: CardTypeService,
    private fieldTypeService: FieldTypeService,
  ) {}

  public async checkExist(id: string): Promise<boolean> {
    return this.fieldRepository.exists({ where: { id } });
  }

  public async createDefaults({
    cardId,
    cardTypeId,
  }: CreateDefaultsDto): Promise<void> {
    const cardExist = await this.cardService.checkExist(cardId);
    const cardTypeExist = await this.cardTypeService.checkExist(cardTypeId);

    if (!cardExist) {
      throw new NotFoundException('Card not found');
    }

    if (!cardTypeExist) {
      throw new NotFoundException('CardType not found');
    }

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
    const exist = await this.checkExist(fieldId);
    if (!exist) {
      throw new NotFoundException('Field not found');
    }

    await this.fieldRepository.update({ id: fieldId }, { value: data.value });
  }

  public async getCardFields(cardId: string): Promise<Field[]> {
    const fields = await this.fieldRepository.find({
      where: { card: { id: cardId } },
      relations: { fieldType: true, card: true },
      order: { fieldType: { cardTypesFieldTypes: { position: 'ASC' } } },
    });

    return fields;
  }
}
