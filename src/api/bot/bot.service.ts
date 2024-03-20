import { Injectable } from '@nestjs/common';
import type { DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { name } from '@/utils/helpers';

import { Bot } from './entities';
import { BotRepository } from './repositories';
import { CreatedBotDto, GotBotDto } from './dto';

import { FlowService } from '../flow/flow.service';
import { NodeService } from '../node/node.service';

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(Bot)
    private botRepository: BotRepository,
    private readonly flowService: FlowService,
    private readonly nodeService: NodeService,
  ) {}

  public async create(userId: string): Promise<CreatedBotDto> {
    const createdBot = this.botRepository.create({
      creator: { id: userId },
      name: name.generateRandomName(),
    });

    await this.botRepository.save(createdBot);

    const flow = await this.flowService.createDefault(createdBot.id);

    await this.nodeService.createDefaults(flow.id);

    return createdBot;
  }

  public async getAll(userId: string): Promise<GotBotDto[]> {
    const bots = await this.botRepository.findBy({ creator: { id: userId } });

    return bots;
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.botRepository.delete({ id });
  }
}
