import { Body, Param } from '@nestjs/common';

import { InjectController, InjectRoute, ReqUser } from '@/decorators';

import { Flow } from './entities';
import { CreateFlowDto } from './dto';
import flowRoutes from './flow.routes';
import { FlowService } from './flow.service';

import { ILocalStrategy } from '../auth/strategies';

@InjectController({ name: flowRoutes.index })
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

  @InjectRoute(flowRoutes.create)
  public async createOne(@Body() data: CreateFlowDto): Promise<Flow> {
    const createdFlow = await this.flowService.create(data);

    return createdFlow;
  }

  @InjectRoute(flowRoutes.getAll)
  public async getAll(
    @ReqUser() user: ILocalStrategy,
    @Param('botId') botId: string,
  ): Promise<Flow[]> {
    const flows = await this.flowService.getAll(user.element.id, botId);

    return flows;
  }
}
