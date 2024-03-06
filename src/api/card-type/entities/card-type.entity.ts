import { Column, Entity, OneToMany } from 'typeorm';

import { enumh } from '@/utils/helpers';
import { Base as BaseEntity } from '@/common/entities';

import { CardTypeEnum, GroupTypeEnum } from '../card-type.enum';
import { CardTypeFieldType } from '@/api/card-type-field-type/entities';

@Entity({ name: 'card_types' })
export class CardType extends BaseEntity {
  @Column({
    type: 'enum',
    enum: CardTypeEnum,
    default: enumh.getFirstKey<typeof CardTypeEnum>(CardTypeEnum),
  })
  type: CardTypeEnum;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column({
    type: 'enum',
    name: 'group_type',
    enum: GroupTypeEnum,
    default: enumh.getFirstKey<typeof GroupTypeEnum>(GroupTypeEnum),
  })
  groupType: GroupTypeEnum;

  @OneToMany(
    () => CardTypeFieldType,
    (cardTypeFieldType) => cardTypeFieldType.cardType,
  )
  cardTypesFieldTypes: CardTypeFieldType[];
}
