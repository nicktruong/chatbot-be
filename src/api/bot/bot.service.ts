import { omit } from 'ramda';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { name } from '@/utils/helpers';

import { Bot } from './entities';
import { BotRepository } from './bot.repository';

import type { DeleteResult } from 'typeorm';
import type { GotBotDto, CreateBotDto, CreatedBotDto } from './dto';

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(Bot)
    private botRepository: BotRepository,
  ) {}

  // TODO: Validate current user is the creatorId
  public async create(data: CreateBotDto): Promise<CreatedBotDto> {
    const { creatorId } = data;

    const createdBot = this.botRepository.create({
      creator: { id: creatorId },
      name: name.generateRandomName(),
    });

    await this.botRepository.save(createdBot);

    return omit(['creator'], createdBot);
  }

  public async getAll(userId: string): Promise<GotBotDto[]> {
    const bots = await this.botRepository.findBy({ creator: { id: userId } });

    return bots;
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.botRepository.delete({ id });
  }
}
