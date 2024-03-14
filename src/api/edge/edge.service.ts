import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Type } from './enums';
import { Edge } from './entities';
import { EdgeRepository } from './edge.repository';
import { CreateEdgeDto, CreatedEdgeDto } from './dto';

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
      });
      await this.edgeRepository.delete({
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

  public async getByCardOrNodeId(id: string, type: Type): Promise<Edge> {
    const condition =
      type === Type.CARD
        ? { card: { id } }
        : [{ sourceNodeId: id }, { targetNodeId: id }];

    const edge = await this.edgeRepository.findOne({
      where: condition,
      relations: { card: true },
    });

    return edge;
  }
}
