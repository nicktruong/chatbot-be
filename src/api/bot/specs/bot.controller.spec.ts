import { Test } from '@nestjs/testing';
import { createMock, type DeepMocked } from '@golevelup/ts-jest';

import { Bot } from '../entities';
import { BotService } from '../bot.service';
import { BotController } from '../bot.controller';

import { ILocalStrategy } from '../../auth/strategies';

describe('BotController', () => {
  let botController: BotController;
  let botService: DeepMocked<BotService>;

  const bots = [
    {
      id: '123',
      name: 'test bot 1',
      publishDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '456',
      name: 'test bot 2',
      publishDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as Bot[];
  // const id = bots[0].id;
  const userId = 'userId';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BotController],
    })
      .useMocker(createMock)
      .compile();

    botService = module.get(BotService);
    botController = module.get(BotController);
  });

  describe('createOne', () => {
    it('should create a bot with valid value', async () => {
      botService.create.mockResolvedValueOnce(bots[0]);
      const user = { element: { id: userId } } as ILocalStrategy;

      const result = await botController.createOne(user);

      expect(result).toEqual(bots[0]);
    });
  });

  describe('getAll', () => {
    it('should get all bots of user', async () => {
      botService.getAll.mockResolvedValueOnce(bots);
      const user = { element: { id: userId } } as ILocalStrategy;

      const result = await botController.getAll(user);

      expect(result).toEqual(bots);
    });
  });

  describe('deleteById', () => {
    it('should delete the bot by id', async () => {
      const deleteResult = { raw: '', affected: 1 };
      botService.deleteById.mockResolvedValueOnce(deleteResult);
      const id = bots[0].id;

      const result = await botController.deleteById(id);

      expect(result).toEqual(deleteResult.affected);
    });
  });
});
