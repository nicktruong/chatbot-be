import { omit } from 'ramda';
import { Exclude } from 'class-transformer';

import { Column, Entity, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';

import { hash } from '@/utils/helpers';
import { UserRole } from '@/common/enums';
import { Base as BaseEntity } from '@/common/entities';

import type { Token } from '@/api/token/entities';
import { Bot } from '@/api/bot/entities/bot.entity';

@Entity({ name: 'customers' })
export class Customer extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => Bot, (bot) => bot.creator)
  bots: Bot[];

  @BeforeInsert()
  @BeforeUpdate()
  private async setInsertingData(): Promise<void> {
    const saltRounds = 10;

    this.password = await hash.generateWithBcrypt({
      source: this.password,
      salt: saltRounds,
    });
  }

  public toResponse(): Omit<
    this,
    'password' | 'setInsertingData' | 'setUpdatingData'
  > & {
    role: UserRole;
  } {
    return {
      ...omit(['password', 'setInsertingData', 'setUpdatingData'], this),
      role: UserRole[UserRole.CUSTOMER],
    };
  }

  public toResponseHavingSessions(sessions: Token[]): Omit<
    this,
    'password' | 'setInsertingData' | 'setUpdatingData'
  > & {
    role: UserRole;
    sessions: Token[];
  } {
    return {
      ...this.toResponse(),
      sessions,
    };
  }
}
