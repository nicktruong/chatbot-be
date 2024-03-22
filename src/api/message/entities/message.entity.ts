import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Bot } from '@/api/bot/entities';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: 'messages' })
export class Message extends BaseEntity {
  @Column()
  value: string;

  @Column()
  sender: string;

  @Column()
  receiver: string;

  @Column({ name: 'is_read' })
  isRead: boolean;

  @Column({ name: 'client_id' })
  clientId: string;

  @Exclude()
  @ManyToOne(() => Bot)
  @JoinColumn({ name: 'bot_id' })
  bot: Bot;
}
