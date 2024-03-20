import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock, type DeepMocked } from '@golevelup/ts-jest';

import { Bot } from '../entities';
import { BotService } from '../bot.service';
import { BotRepository } from '../repositories';

import { Customer } from '../../customer/entities';

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

  const bots = [
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
  ] as Bot[];

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

      const result = await botService.create(creator.id);

      expect(result).toEqual(bots[0]);
    });
  });

  describe('getAll', () => {
    it('should get all bots of user', async () => {
      botRepository.findBy.mockResolvedValueOnce(bots);

      const result = await botService.getAll(creator.id);

      expect(result).toEqual(bots);
    });
  });

  describe('deleteById', () => {
    it('should delete the bot by id', async () => {
      const deleteResult = {
        raw: 'raw sql',
        affected: 1,
      };
      botRepository.delete.mockResolvedValueOnce(deleteResult);

      const result = await botService.deleteById(bots[0].id);

      expect(result).toEqual(deleteResult);
    });
  });
});
