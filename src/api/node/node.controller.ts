import { Body, Param } from '@nestjs/common';
import { InjectController, InjectRoute } from '@/decorators';

import {
  GotNodeDto,
  CreateNodeDto,
  CreatedNodeDto,
  ChangePositionDto,
  ChangedPositionDto,
} from './dto';
import nodeRoutes from './node.routes';
import { NodeService } from './node.service';

@InjectController({ name: nodeRoutes.index })
export class NodeController {
  constructor(private nodeService: NodeService) {}

  @InjectRoute(nodeRoutes.create)
  public async createOne(@Body() data: CreateNodeDto): Promise<CreatedNodeDto> {
    const createdNode = await this.nodeService.create(data);

    return createdNode;
  }

  @InjectRoute(nodeRoutes.getAll)
  public async getAll(@Param('flowId') flowId: string): Promise<GotNodeDto[]> {
    const nodes = await this.nodeService.getAll(flowId);

    return nodes;
  }

  @InjectRoute(nodeRoutes.changePosition)
  public async changePosition(
    @Body() data: ChangePositionDto,
    @Param('nodeId') nodeId: string,
  ): Promise<ChangedPositionDto> {
    const changedPosition = await this.nodeService.changePosition(nodeId, data);

    return changedPosition;
  }
}
