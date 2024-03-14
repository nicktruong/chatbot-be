import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CardType } from '@/api/card-type/entities';
import { FieldType } from '@/api/field-type/entities';

import { Base as BaseEntity } from '@/common/entities/base.entity';

@Entity({ name: 'card_types_field_types' })
export class CardTypeFieldType extends BaseEntity {
  @Column()
  position: number;

  @ManyToOne(() => CardType)
  @JoinColumn({ name: 'card_type_id' })
  cardType: CardType;

  @ManyToOne(() => FieldType)
  @JoinColumn({ name: 'field_type_id' })
  fieldType: FieldType;
}
