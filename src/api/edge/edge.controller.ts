import { Body, Param, Query } from '@nestjs/common';

import { InjectController, InjectRoute } from '@/decorators';

import { Edge } from './entities';
import edgeRoutes from './edge.routes';
import { EdgeService } from './edge.service';
import { CreateEdgeDto, CreatedEdgeDto } from './dto';

@InjectController({ name: edgeRoutes.index })
export class EdgeController {
  constructor(private edgeService: EdgeService) {}

  @InjectRoute(edgeRoutes.createOrUpdate)
  public async createOrUpdate(
    @Body() data: CreateEdgeDto,
  ): Promise<CreatedEdgeDto> {
    const createdEdge = await this.edgeService.createOrUpdate(data);

    return createdEdge;
  }

  @InjectRoute(edgeRoutes.getByCardOrNodeId)
  public async getByCardOrNodeId(
    @Param('id') id: string,
    @Query('type') type: 'card' | 'node',
  ): Promise<Edge> {
    const edge = await this.edgeService.getByCardOrNodeId(id, type);

    return edge;
  }
}
