import {
  Entity,
  OneToOne,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { Card } from '@/api/card/entities';
import { Node } from '@/api/node/entities';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: 'edges' })
export class Edge extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'source_node_id' })
  sourceNodeId: string;

  @PrimaryGeneratedColumn('uuid', { name: 'target_node_id' })
  targetNodeId: string;

  @Expose()
  get cardId(): string {
    return this.card?.id;
  }

  @Exclude()
  @ManyToOne(() => Node, (node) => node.sourceNodeToEdge)
  @JoinColumn({ name: 'source_node_id' })
  sourceNode: Node;

  @Exclude()
  @ManyToOne(() => Node, (node) => node.targetNodeToEdge)
  @JoinColumn({ name: 'target_node_id' })
  targetNode: Node;

  @Exclude()
  @OneToOne(() => Card)
  @JoinColumn({ name: 'card_id' })
  card: Card;
}
