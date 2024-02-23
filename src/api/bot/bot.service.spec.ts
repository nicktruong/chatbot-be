import { omit } from 'ramda';
import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Bot } from './entities';
import { CreateBotDto } from './dto';
import { BotService } from './bot.service';
import { BotRepository } from './bot.repository';

import { Customer } from '../customer/entities';

import type { DeepMocked } from '@golevelup/ts-jest';

describe('BotService', () => {
  let botService: BotService;
  let botRepository: DeepMocked<BotRepository>;

  const creator = {
    bots: [],
    id: 'creator 1',
    name: 'creator 1',
    password: 'password1',
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'test@example.com',
  } as Customer;

  const bots: Bot[] = [
    {
      creator,
      id: '123',
      name: 'test bot 1',
      publishDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      creator,
      id: '456',
      name: 'test bot 2',
      publishDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  creator.bots = bots;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BotService,
        {
          provide: getRepositoryToken(Bot),
          useValue: {
            save: jest.fn(),
            create: jest.fn(),
            findBy: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    botService = module.get(BotService);
    botRepository = module.get(getRepositoryToken(Bot));
  });

  describe('create', () => {
    it('should create a bot', async () => {
      botRepository.create.mockReturnValueOnce(bots[0]);

      const data: CreateBotDto = { creatorId: '123' };

      const result = await botService.create(data);

      expect(result).toEqual(omit(['creator'], bots[0]));
      expect(botRepository.create).toHaveBeenCalled();
      expect(botRepository.save).toHaveBeenCalled();
      expect(botRepository.save.mock.calls[0][0]).toEqual(bots[0]);
    });
  });

  describe('getAll', () => {
    it('should get all bots of user', async () => {
      botRepository.findBy.mockResolvedValueOnce(bots);

      const result = await botService.getAll('123');

      expect(result).toEqual(bots);
      expect(botRepository.findBy).toHaveBeenCalled();
      expect(botRepository.findBy.mock.calls[0][0]).toEqual({
        creator: { id: '123' },
      });
    });
  });

  describe('deleteById', () => {
    it('should delete the bot by id', async () => {
      botRepository.delete.mockResolvedValueOnce('test value' as any);

      const result = await botService.deleteById('123');

      expect(result).toEqual('test value');
      expect(botRepository.delete).toHaveBeenCalled();
      expect(botRepository.delete.mock.calls[0][0]).toEqual({ id: '123' });
    });
  });
});
