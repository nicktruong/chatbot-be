import { Body, Param } from '@nestjs/common';

import { InjectController, InjectRoute } from '@/decorators';

import botRoutes from './bot.routes';
import { BotService } from './bot.service';
import { CreateBotDto, GotBotDto, CreatedBotDto } from './dto';

@InjectController({ name: botRoutes.index })
export class BotController {
  constructor(private readonly botService: BotService) {}

  @InjectRoute(botRoutes.create)
  public async createOne(@Body() data: CreateBotDto): Promise<CreatedBotDto> {
    const createdBot = await this.botService.create(data);

    return createdBot;
  }

  @InjectRoute(botRoutes.getAll)
  public async getAll(@Param('userId') userId: string): Promise<GotBotDto[]> {
    const gotBots = await this.botService.getAll(userId);

    return gotBots;
  }

  @InjectRoute(botRoutes.deleteById)
  public async deleteById(@Param('id') id: string): Promise<string> {
    await this.botService.deleteById(id);

    return id;
  }
}
