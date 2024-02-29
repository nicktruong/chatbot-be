import { Body, Param } from '@nestjs/common';

import { InjectController, InjectRoute, ReqUser } from '@/decorators';

import flowRoutes from './flow.routes';
import { FlowService } from './flow.service';
import { CreateFlowDto, CreatedFlowDto, GotFlowDto } from './dto';

import { ILocalStrategy } from '../auth/strategies';

@InjectController({ name: flowRoutes.index })
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

  @InjectRoute(flowRoutes.create)
  public async createOne(@Body() data: CreateFlowDto): Promise<CreatedFlowDto> {
    const createdBot = await this.flowService.create(data);
    return createdBot;
  }

  @InjectRoute(flowRoutes.getAll)
  public async getAll(
    @ReqUser() user: ILocalStrategy,
    @Param('botId') botId: string,
  ): Promise<GotFlowDto[]> {
    const createdBot = await this.flowService.getAll(user.element.id, botId);
    return createdBot;
  }
}