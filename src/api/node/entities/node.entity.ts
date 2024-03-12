import { Exclude, Type } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { Card } from '@/api/card/entities';
import { Edge } from '@/api/edge/entities';
import { Flow } from '@/api/flow/entities';
import { NodeType } from '@/api/node-type/entities';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: 'nodes' })
export class Node extends BaseEntity {
  @Type(() => Number)
  @Column()
  x: number;

  @Type(() => Number)
  @Column()
  y: number;

  @Column()
  name: string;

  @Column()
  position: number;

  @ManyToOne(() => NodeType)
  @JoinColumn({ name: 'node_type_id' })
  nodeType: NodeType;

  @Exclude()
  @ManyToOne(() => Flow, (flow) => flow.nodes)
  flow: Flow;

  @Exclude()
  @OneToMany(() => Card, (card) => card.node)
  cards: Card[];

  @Exclude()
  @OneToMany(() => Edge, (edge) => edge.sourceNode)
  sourceNodeToEdge: Edge[];

  @Exclude()
  @OneToMany(() => Edge, (edge) => edge.targetNode)
  targetNodeToEdge: Edge[];
}
