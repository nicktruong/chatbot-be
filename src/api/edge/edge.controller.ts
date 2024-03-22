import { Body, Param, Query } from '@nestjs/common';

import { InjectController, InjectRoute } from '@/decorators';

import { Edge } from './entities';
import { CardOrNode } from './enums';
import { CreateEdgeDto } from './dto';
import edgeRoutes from './edge.routes';
import { EdgeService } from './edge.service';

@InjectController({ name: edgeRoutes.index })
export class EdgeController {
  constructor(private edgeService: EdgeService) {}

  @InjectRoute(edgeRoutes.createOrUpdate)
  public async createOrUpdate(@Body() data: CreateEdgeDto): Promise<Edge> {
    const createdEdge = await this.edgeService.createOrUpdate(data);

    return createdEdge;
  }

  @InjectRoute(edgeRoutes.getByCardOrNodeId)
  public async getByCardOrNodeId(
    @Param('id') id: string,
    @Query('type') type: CardOrNode,
  ): Promise<Edge[]> {
    const edge = await this.edgeService.getByCardOrNodeId(id, type);

    return edge;
  }

  @InjectRoute(edgeRoutes.deleteById)
  public async DeleteQueryBuilder(@Param('id') id: string): Promise<number> {
    const { affected } = await this.edgeService.deleteById(id);

    return affected;
  }
}
