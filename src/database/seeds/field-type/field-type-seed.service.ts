import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FieldType } from '@/api/field-type/entities';
import { FieldTypeEnum } from '@/api/field-type/field-type.enum';
import { FieldTypeRepository } from '@/api/field-type/field-type.repository';

@Injectable()
export class FieldTypeSeedService {
  constructor(
    @InjectRepository(FieldType) private repository: FieldTypeRepository,
  ) {}

  async seedLabelFieldType() {
    const countFieldType = await this.repository.count({
      where: { type: FieldTypeEnum.LABEL },
    });

    if (!countFieldType) {
      await this.repository.save(
        this.repository.create([
          {
            type: FieldTypeEnum.LABEL,
            question: 'Label',
          },
          {
            type: FieldTypeEnum.CONDITION,
            question: 'Condition',
          },
        ]),
      );
    }
  }

  async run() {
    await this.seedLabelFieldType();
  }
}
