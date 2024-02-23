import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { CreateBotDto, CreatedBotDto } from './dto';

import type { DeepMocked } from '@golevelup/ts-jest';

describe('BotController', () => {
  let botController: BotController;
  let botService: DeepMocked<BotService>;

  const bots: CreatedBotDto[] = [
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
  ];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BotController],
    })
      .useMocker(createMock)
      .compile();

    botService = module.get(BotService);
    botController = module.get(BotController);
  });

  describe('createOne', () => {
    it('should create a bot', async () => {
      botService.create.mockResolvedValueOnce(bots[0]);

      const data: CreateBotDto = { creatorId: '123' };

      const result = await botController.createOne(data);

      expect(result).toEqual(bots[0]);
      expect(botService.create).toHaveBeenCalled();
      expect(botService.create.mock.calls[0][0]).toEqual(data);
    });
  });

  describe('getAll', () => {
    it('should get all bots of user', async () => {
      botService.getAll.mockResolvedValueOnce(bots);

      const result = await botController.getAll('123');

      expect(result).toEqual(bots);
      expect(botService.getAll).toHaveBeenCalled();
      expect(botService.getAll.mock.calls[0][0]).toEqual('123');
    });
  });

  describe('deleteById', () => {
    it('should delete the bot by id', async () => {
      const result = await botController.deleteById('123');

      expect(result).toEqual('123');
      expect(botService.deleteById).toHaveBeenCalled();
      expect(botService.deleteById.mock.calls[0][0]).toEqual('123');
    });
  });
});
