import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Node } from '@/api/node/entities';
import { CardType } from '@/api/card-type/entities';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: 'cards' })
export class Card extends BaseEntity {
  @Column()
  position: number;

  @Column({ name: 'node_id' })
  nodeId: string;

  @Column({ name: 'card_type_id' })
  cardTypeId: string;

  @ManyToOne(() => Node, (node) => node.cards)
  @JoinColumn({ name: 'node_id' })
  node: Node;

  @ManyToOne(() => CardType)
  @JoinColumn({ name: 'card_type_id' })
  cardType: CardType;
}
