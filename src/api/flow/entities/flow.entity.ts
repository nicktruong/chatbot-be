import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Bot } from '@/api/bot/entities';
import { Node } from '@/api/node/entities';
import { FlowType } from '@/api/flow-type/entities';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: 'flows' })
export class Flow extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Bot, (bot) => bot.flows)
  bot: Bot;

  @ManyToOne(() => FlowType)
  flowType: FlowType;

  @OneToMany(() => Node, (node) => node.flow)
  nodes: Node[];
}
