import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Flow } from '@/api/flow/entities';
import { Customer } from '@/api/customer/entities';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: 'bots' })
export class Bot extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Customer, (customer) => customer.bots)
  creator: Customer;

  @Column({
    name: 'publish_date',
    type: 'timestamptz',
    nullable: true,
  })
  publishDate: Date;

  @OneToMany(() => Flow, (flow) => flow.bot)
  flows: Flow[];
}
