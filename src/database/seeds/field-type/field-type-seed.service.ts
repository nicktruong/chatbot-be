import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FieldType } from '@/api/field-type/entities';
import { FieldTypeEnum } from '@/api/field-type/field-type.enum';
import { FieldTypeRepository } from '@/api/field-type/field-type.repository';

@Injectable()
export class FieldTypeSeedService {
  fields = [
    {
      question: 'Label',
      type: FieldTypeEnum.LABEL,
    },
    {
      question: 'Condition',
      type: FieldTypeEnum.CONDITION,
    },
    {
      question: 'Question to ask the user',
      type: FieldTypeEnum.QUESTION,
    },
    {
      question: 'Store result in',
      type: FieldTypeEnum.STORE_RESULT_IN,
    },
    {
      question: 'Message to send',
      type: FieldTypeEnum.MESSAGE_TO_SEND,
    },
  ];

  constructor(
    @InjectRepository(FieldType) private repository: FieldTypeRepository,
  ) {}

  async seedFieldType({
    type,
    question,
  }: {
    type: FieldTypeEnum;
    question: string;
  }) {
    const countFieldType = await this.repository.count({
      where: { type },
    });

    if (!countFieldType) {
      // Don't use .create([]) here as we may modify fields
      await this.repository.save(this.repository.create({ type, question }));
    }
  }

  async run() {
    await Promise.all(this.fields.map((field) => this.seedFieldType(field)));
  }
}
