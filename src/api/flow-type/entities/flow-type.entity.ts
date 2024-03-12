import { Exclude } from 'class-transformer';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { NodeType } from '@/api/node-type/entities';
import { Base as BaseEntity } from '@/common/entities';

import { FlowTypeEnum } from '../enums';

@Entity({ name: 'flow_types' })
export class FlowType extends BaseEntity {
  @Column({
    type: 'enum',
    enum: FlowTypeEnum,
  })
  type: FlowTypeEnum;

  @Column()
  desc: string;

  @Exclude()
  @ManyToMany(() => NodeType, (nodeType) => nodeType.flowTypes)
  @JoinTable()
  nodeTypes: NodeType[];
}
