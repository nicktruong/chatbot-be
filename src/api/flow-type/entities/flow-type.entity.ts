import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { enumh } from '@/utils/helpers';
import { NodeType } from '@/api/node-type/entities';
import { Base as BaseEntity } from '@/common/entities';

import { FlowTypeEnum } from '../enums';

@Entity({ name: 'flow_types' })
export class FlowType extends BaseEntity {
  @Column({
    type: 'enum',
    enum: FlowTypeEnum,
    default: enumh.getFirstKey<typeof FlowTypeEnum>(FlowTypeEnum),
  })
  type: FlowTypeEnum;

  @Column()
  desc: string;

  @ManyToMany(() => NodeType, (nodeType) => nodeType.flowTypes)
  @JoinTable()
  nodeTypes: NodeType[];
}
