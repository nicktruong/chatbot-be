import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Edge } from './entities';
import { EdgeRepository } from './edge.repository';
import { CreateEdgeDto, CreatedEdgeDto, GotEdgeDto } from './dto';

import { NodeService } from '../node/node.service';

@Injectable()
export class EdgeService {
  constructor(
    @InjectRepository(Edge) private edgeRepository: EdgeRepository,
    private nodeService: NodeService,
  ) {}

  public async createOrUpdate(data: CreateEdgeDto): Promise<CreatedEdgeDto> {
    if (!data.cardId) {
      await this.edgeRepository.delete({
        sourceNodeId: data.sourceNodeId,
        targetNodeId: data.targetNodeId,
      });
    } else {
      await this.edgeRepository.delete({ card: { id: data.cardId } });
    }

    const createdEdge = this.edgeRepository.create({
      card: { id: data.cardId },
      sourceNodeId: data.sourceNodeId,
      targetNodeId: data.targetNodeId,
    });

    const { createdAt, updatedAt } = await this.edgeRepository.save(
      createdEdge,
    );

    return {
      ...data,
      createdAt,
      updatedAt,
    };
  }

  public async getAll(flowId: string): Promise<GotEdgeDto[]> {
    const nodeIds = (await this.nodeService.getAll(flowId)).map(
      (node) => `'${node.id}'::uuid`,
    );

    if (nodeIds.length === 0) return [];

    const edges = await this.edgeRepository
      .createQueryBuilder()
      .where(`source_node_id = ANY(ARRAY[${nodeIds}])`)
      .orWhere(`target_node_id = ANY(ARRAY[${nodeIds}])`)
      .getMany();

    return edges;
  }

  public async getByCardId(cardId: string): Promise<GotEdgeDto> {
    const edge = await this.edgeRepository.findOneBy({
      card: { id: cardId },
    });

    return edge;
  }
}
