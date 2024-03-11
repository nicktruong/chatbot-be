import { Param } from '@nestjs/common';

import { InjectController, InjectRoute, ReqUser } from '@/decorators';

import botRoutes from './bot.routes';
import { BotService } from './bot.service';
import { GotBotDto, CreatedBotDto } from './dto';

import { FlowTypeEnum } from '../flow-type/enums';
import { FlowService } from '../flow/flow.service';
import type { ILocalStrategy } from '../auth/strategies';

const MAIN_FLOW_NAME = 'Main';

@InjectController({ name: botRoutes.index })
export class BotController {
  constructor(
    private readonly botService: BotService,
    private readonly flowService: FlowService,
  ) {}

  @InjectRoute(botRoutes.create)
  public async createOne(
    @ReqUser() user: ILocalStrategy,
  ): Promise<CreatedBotDto> {
    const createdBot = await this.botService.create(user.element.id);

    // Create one default main flow for this bot
    await this.flowService.create({
      name: MAIN_FLOW_NAME,
      botId: createdBot.id,
      flowType: FlowTypeEnum.MAIN,
    });

    return createdBot;
  }

  @InjectRoute(botRoutes.getAll)
  public async getAll(@ReqUser() user: ILocalStrategy): Promise<GotBotDto[]> {
    const gotBots = await this.botService.getAll(user.element.id);

    return gotBots;
  }

  @InjectRoute(botRoutes.deleteById)
  public async deleteById(@Param('id') id: string): Promise<string> {
    await this.botService.deleteById(id);

    return id;
  }
}
