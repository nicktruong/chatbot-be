import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { Card } from '@/api/card/entities';
import { Edge } from '@/api/edge/entities';
import { Flow } from '@/api/flow/entities';
import { NodeType } from '@/api/node-type/entities';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: 'nodes' })
export class Node extends BaseEntity {
  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  name: string;

  @Column()
  position: number;

  @ManyToOne(() => Flow, (flow) => flow.nodes)
  flow: Flow;

  @ManyToOne(() => NodeType)
  @JoinColumn({ name: 'node_type_id' })
  nodeType: NodeType;

  @OneToMany(() => Card, (card) => card.node)
  cards: Card[];

  @OneToMany(() => Edge, (edge) => edge.sourceNode)
  sourceNodeToEdge: Edge[];

  @OneToMany(() => Edge, (edge) => edge.targetNode)
  targetNodeToEdge: Edge[];
}
