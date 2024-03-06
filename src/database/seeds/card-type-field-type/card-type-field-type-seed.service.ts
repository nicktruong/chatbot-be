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
  constructor(
    @InjectRepository(CardTypeFieldType)
    private repository: CardTypeFieldTypeRepository,
    private cardTypeService: CardTypeService,
    private fieldTypeService: FieldTypeService,
  ) {}

  async seedExpressionCardFields() {
    const countFieldType = await this.repository.count({
      where: { cardType: { type: CardTypeEnum.EXPRESSION } },
    });

    if (!countFieldType) {
      const expressionCardType = await this.cardTypeService.getByType(
        CardTypeEnum.EXPRESSION,
      );
      const labelFieldType = await this.fieldTypeService.getByType(
        FieldTypeEnum.LABEL,
      );
      const conditionFieldType = await this.fieldTypeService.getByType(
        FieldTypeEnum.CONDITION,
      );

      await this.repository.save(
        this.repository.create([
          {
            position: 0,
            fieldType: { id: labelFieldType.id },
            cardType: { id: expressionCardType.id },
          },
          {
            position: 1,
            cardType: { id: expressionCardType.id },
            fieldType: { id: conditionFieldType.id },
          },
        ]),
      );
    }
  }

  async run() {
    await this.seedExpressionCardFields();
  }
}
