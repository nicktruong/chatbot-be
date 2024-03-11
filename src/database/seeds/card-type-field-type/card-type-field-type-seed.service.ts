import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CardTypeEnum } from '@/api/card-type/card-type.enum';
import { FieldTypeEnum } from '@/api/field-type/field-type.enum';
import { CardTypeService } from '@/api/card-type/card-type.service';
import { FieldTypeService } from '@/api/field-type/field-type.service';
import { CardTypeFieldType } from '@/api/card-type-field-type/entities';
import { CardTypeFieldTypeRepository } from '@/api/card-type-field-type/card-type-field-type.repository';

@Injectable()
export class CardTypeFieldTypeSeedService {
  cardTypeFieldTypes = [
    {
      cardType: CardTypeEnum.EXPRESSION,
      fieldTypes: [
        { type: FieldTypeEnum.LABEL, position: 0 },
        { type: FieldTypeEnum.CONDITION, position: 1 },
      ],
    },
    {
      cardType: CardTypeEnum.NUMBER,
      fieldTypes: [
        { type: FieldTypeEnum.QUESTION, position: 0 },
        { type: FieldTypeEnum.STORE_RESULT_IN, position: 1 },
      ],
    },
    {
      cardType: CardTypeEnum.TEXT,
      fieldTypes: [{ type: FieldTypeEnum.MESSAGE_TO_SEND, position: 0 }],
    },
  ];

  constructor(
    @InjectRepository(CardTypeFieldType)
    private repository: CardTypeFieldTypeRepository,
    private cardTypeService: CardTypeService,
    private fieldTypeService: FieldTypeService,
  ) {}

  async seedCardTypeFieldType({
    cardType,
    fieldTypes,
  }: {
    cardType: CardTypeEnum;
    fieldTypes: { type: FieldTypeEnum; position: number }[];
  }) {
    const countFieldType = await this.repository.count({
      where: { cardType: { type: cardType } },
    });

    if (!countFieldType) {
      const { id: cardTypeId } = await this.cardTypeService.getByType(cardType);
      const fieldTypeInstances = await Promise.all(
        fieldTypes.map(async ({ type, position }) => {
          const fieldType = await this.fieldTypeService.getByType(type);
          return { ...fieldType, position };
        }),
      );

      await this.repository.save(
        this.repository.create(
          fieldTypeInstances.map(({ id: fieldTypeId, position }) => ({
            position,
            cardType: { id: cardTypeId },
            fieldType: { id: fieldTypeId },
          })),
        ),
      );
    }
  }

  async run() {
    await Promise.all(
      this.cardTypeFieldTypes.map((cardTypeFieldType) =>
        this.seedCardTypeFieldType(cardTypeFieldType),
      ),
    );
  }
}
