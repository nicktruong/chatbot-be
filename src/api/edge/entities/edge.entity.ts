import {
  Entity,
  OneToOne,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Card } from '@/api/card/entities';
import { Node } from '@/api/node/entities';

@Entity({ name: 'edges' })
export class Edge {
  @PrimaryGeneratedColumn('uuid', { name: 'source_node_id' })
  sourceNodeId: string;

  @PrimaryGeneratedColumn('uuid', { name: 'target_node_id' })
  targetNodeId: string;

  @ManyToOne(() => Node, (node) => node.sourceNodeToEdge)
  @JoinColumn({ name: 'source_node_id' })
  sourceNode: Node;

  @ManyToOne(() => Node, (node) => node.targetNodeToEdge)
  @JoinColumn({ name: 'target_node_id' })
  targetNode: Node;

  @OneToOne(() => Card)
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
