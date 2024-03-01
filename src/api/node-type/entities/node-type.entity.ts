import { Column, Entity } from 'typeorm';

import { enumh } from '@/utils/helpers';
import { Base as BaseEntity } from '@/common/entities';

import { NodeTypeEnum } from '../enums';

@Entity({ name: 'node_types' })
export class NodeType extends BaseEntity {
  @Column({
    type: 'enum',
    enum: NodeTypeEnum,
    default: enumh.getFirstKey<typeof NodeTypeEnum>(NodeTypeEnum),
  })
  type: NodeTypeEnum;

  @Column()
  desc: string;

  @Column({ name: 'default_x' })
  defaultX: number;

  @Column({ name: 'default_y' })
  defaultY: number;
}
