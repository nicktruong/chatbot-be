import { Body } from '@nestjs/common';

import { InjectController, InjectRoute } from '@/decorators';

import flowRoutes from './flow.routes';
import { FlowService } from './flow.service';
import { CreateFlowDto, CreatedFlowDto } from './dto';

@InjectController({ name: flowRoutes.index })
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

  @InjectRoute(flowRoutes.create)
  public async createOne(@Body() data: CreateFlowDto): Promise<CreatedFlowDto> {
    const createdBot = await this.flowService.create(data);
    return createdBot;
  }
}
