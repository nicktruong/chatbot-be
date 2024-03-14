import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { Base as BaseEntity } from '@/common/entities';

import { Message } from './message.entity';

@Entity({ name: 'schedules' })
export class Schedule extends BaseEntity {
  @OneToOne(() => Message)
  @JoinColumn({ name: 'message_id' })
  message: Message;

  @Column({ name: 'is_sent' })
  isSent: boolean;

  @Column({
    name: 'scheduled_date',
    type: 'timestamptz',
  })
  scheduledDate: Date;
}
