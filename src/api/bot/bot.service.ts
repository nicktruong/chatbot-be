import { omit } from 'ramda';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { name } from '@/utils/helpers';

import { Bot } from './entities';
import { BotRepository } from './bot.repository';

import type { DeleteResult } from 'typeorm';

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(Bot)
    private botRepository: BotRepository,
  ) {}

  public async create(userId: string): Promise<Bot> {
    const createdBot = this.botRepository.create({
      creator: { id: userId },
      name: name.generateRandomName(),
    });

    await this.botRepository.save(createdBot);

    return createdBot;
  }

  public async getAll(userId: string): Promise<Bot[]> {
    const bots = await this.botRepository.findBy({ creator: { id: userId } });

    return bots;
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.botRepository.delete({ id });
  }
}
