import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToMany } from 'typeorm';

import { FlowType } from '@/api/flow-type/entities';
import { Base as BaseEntity } from '@/common/entities';

import { NodeTypeEnum } from '../enums';

@Entity({ name: 'node_types' })
export class NodeType extends BaseEntity {
  @Column({
    type: 'enum',
    enum: NodeTypeEnum,
  })
  type: NodeTypeEnum;

  @Column()
  desc: string;

  @Column({ name: 'default_x' })
  defaultX: number;

  @Column({ name: 'default_y' })
  defaultY: number;

  @Exclude()
  @ManyToMany(() => FlowType, (flowType) => flowType.nodeTypes)
  flowTypes: FlowType[];
}
