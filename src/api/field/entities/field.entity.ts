import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base as BaseEntity } from '@/common/entities';
import { Card } from '@/api/card/entities';
import { FieldType } from '@/api/field-type/entities';

@Entity({ name: 'fields' })
export class Field extends BaseEntity {
  @Column()
  value: string;

  @ManyToOne(() => Card)
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @Column()
  cardId: string;

  @ManyToOne(() => FieldType)
  @JoinColumn({ name: 'field_type_id' })
  fieldType: FieldType;

  @Column()
  fieldTypeId: string;
}
