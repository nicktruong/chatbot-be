import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

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
}
