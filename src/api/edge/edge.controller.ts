import { Body, Param } from '@nestjs/common';

import { InjectController, InjectRoute } from '@/decorators';

import edgeRoutes from './edge.routes';
import { EdgeService } from './edge.service';
import { CreateEdgeDto, CreatedEdgeDto, GotEdgeDto } from './dto';

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

  @InjectRoute(edgeRoutes.getAll)
  public async getAll(@Param('flowId') flowId: string): Promise<GotEdgeDto[]> {
    const edges = await this.edgeService.getAll(flowId);

    return edges;
  }

  @InjectRoute(edgeRoutes.getByCardId)
  public async getByCardId(@Param('cardId') cardId: string) {
    const edge = await this.edgeService.getByCardId(cardId);

    return edge;
  }
}
