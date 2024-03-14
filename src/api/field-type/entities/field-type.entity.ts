import { Column, Entity, OneToMany } from 'typeorm';

import { enumh } from '@/utils/helpers';
import { Base as BaseEntity } from '@/common/entities';
import { CardTypeFieldType } from '@/api/card-type-field-type/entities';

import { FieldTypeEnum } from '../field-type.enum';

@Entity({ name: 'field_types' })
export class FieldType extends BaseEntity {
  @Column({
    type: 'enum',
    enum: FieldTypeEnum,
    default: enumh.getFirstKey<typeof FieldTypeEnum>(FieldTypeEnum),
  })
  type: FieldTypeEnum;

  @Column()
  question: string;

  @OneToMany(
    () => CardTypeFieldType,
    (cardTypeFieldType) => cardTypeFieldType.fieldType,
  )
  cardTypesFieldTypes: CardTypeFieldType[];
}
