import { Body } from '@nestjs/common';
import { InjectController, InjectRoute } from '@/decorators';

import nodeRoutes from './node.routes';
import { NodeService } from './node.service';
import { CreateNodeDto, CreatedNodeDto, GotNodeDto } from './dto';

@InjectController({ name: nodeRoutes.index })
export class NodeController {
  constructor(private nodeService: NodeService) {}

  @InjectRoute(nodeRoutes.create)
  public async createOne(@Body() data: CreateNodeDto): Promise<CreatedNodeDto> {
    const createdNode = await this.nodeService.create(data);

    return createdNode;
  }

  @InjectRoute(nodeRoutes.getAll)
  public async getAll(): Promise<GotNodeDto[]> {
    const nodes = await this.nodeService.getAll();

    return nodes;
  }
}
