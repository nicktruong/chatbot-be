import { Body } from '@nestjs/common';

import { InjectController, InjectRoute } from '@/decorators';

import { CreateEdgeDto } from './dto';
import edgeRoutes from './edge.routes';
import { EdgeService } from './edge.service';

@InjectController({ name: edgeRoutes.index })
export class EdgeController {
  constructor(private edgeService: EdgeService) {}

  @InjectRoute(edgeRoutes.create)
  public async createOne(@Body() data: CreateEdgeDto) {
    const createdEdge = await this.edgeService.create(data);

    return createdEdge;
  }
}
