import { Column, Entity, ManyToOne } from 'typeorm';

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
    type: 'timestamp',
    nullable: true,
  })
  publishDate: Date;
}
