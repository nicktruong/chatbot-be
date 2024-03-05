import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Edge } from './entities';
import { EdgeRepository } from './edge.repository';
import { CreateEdgeDto, CreatedEdgeDto } from './dto';

@Injectable()
export class EdgeService {
  constructor(@InjectRepository(Edge) private edgeRepository: EdgeRepository) {}

  public async create(data: CreateEdgeDto): Promise<CreatedEdgeDto> {
    const createdEdge = this.edgeRepository.create({
      sourceNode: { id: data.sourceNodeId },
      targetNode: { id: data.targetNodeId },
    });

    await this.edgeRepository.save(createdEdge);

    return {
      ...data,
      createdAt: createdEdge.createdAt,
      updatedAt: createdEdge.updatedAt,
    };
  }
}
