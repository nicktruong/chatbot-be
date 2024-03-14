import { Param } from '@nestjs/common';

import { InjectController, InjectRoute, ReqUser } from '@/decorators';

import botRoutes from './bot.routes';
import { BotService } from './bot.service';
import { GotBotDto, CreatedBotDto } from './dto';

import { FlowTypeEnum } from '../flow-type/enums';
import { NodeTypeEnum } from '../node-type/enums';
import { FlowService } from '../flow/flow.service';
import { NodeService } from '../node/node.service';
import type { ILocalStrategy } from '../auth/strategies';
import { NodeTypeService } from '../node-type/node-type.service';

const MAIN_FLOW_NAME = 'Main';

@InjectController({ name: botRoutes.index })
export class BotController {
  constructor(
    private readonly botService: BotService,
    private readonly flowService: FlowService,
    private readonly nodeService: NodeService,
    private readonly nodeTypeService: NodeTypeService,
  ) {}

  @InjectRoute(botRoutes.create)
  public async createOne(
    @ReqUser() user: ILocalStrategy,
  ): Promise<CreatedBotDto> {
    const createdBot = await this.botService.create(user.element.id);

    // TODO: Get nodes for default main flow from flow_type_node_type
    // TODO: If time allows, convert flow_type_node_type to a template table
    // Create one default main flow for this bot
    const flow = await this.flowService.create({
      name: MAIN_FLOW_NAME,
      botId: createdBot.id,
      flowType: FlowTypeEnum.MAIN,
    });

    // Create default start node for main flow
    await this.nodeService.create({
      flowId: flow.id,
      type: NodeTypeEnum.START,
    });

    // Create default end node for main flow
    await this.nodeService.create({
      flowId: flow.id,
      type: NodeTypeEnum.END,
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
