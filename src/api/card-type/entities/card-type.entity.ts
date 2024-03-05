import { Column, Entity } from 'typeorm';

import { Base as BaseEntity } from '@/common/entities';
import { CardTypeEnum, GroupTypeEnum } from '../card-type.enum';
import { enumh } from '@/utils/helpers';

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
}
