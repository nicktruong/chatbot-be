import { DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Edge } from './entities';
import { CardOrNode } from './enums';
import { CreateEdgeDto } from './dto';
import { EdgeRepository } from './edge.repository';

@Injectable()
export class EdgeService {
  constructor(@InjectRepository(Edge) private edgeRepository: EdgeRepository) {}

  public async createOrUpdate({
    cardId,
    sourceNodeId,
    targetNodeId,
  }: CreateEdgeDto): Promise<Edge> {
    // Remove edges beforing creating new edges to prevent:
    // - one card | node can link to multiple targets
    let edges = await this.edgeRepository.find({
      where: {
        sourceNodeId,
        card: { id: cardId },
      },
      relations: {
        card: true,
      },
    });

    // If the payload only includes sourceNodeId & targetNodeId
    // => filter out all the edges include cardId to get the correct edge
    if (!cardId) {
      edges = edges.filter((edge) => !edge.card);
    }

    await this.edgeRepository.remove(edges);

    const createdEdge = this.edgeRepository.create({
      card: { id: cardId },
      sourceNodeId: sourceNodeId,
      targetNodeId: targetNodeId,
    });

    await this.edgeRepository.save(createdEdge);

    return createdEdge;
  }

  public async getByCardOrNodeId(
    id: string,
    type: CardOrNode,
  ): Promise<Edge[]> {
    const condition =
      type === CardOrNode.CARD
        ? { card: { id } }
        : [{ sourceNodeId: id }, { targetNodeId: id }];

    const edges = await this.edgeRepository.find({
      where: condition,
      relations: { card: true },
    });

    return edges;
  }

  public async getOneByCardOrSourceNodeId(
    id: string,
    type: CardOrNode,
  ): Promise<Edge> {
    const condition =
      type === CardOrNode.CARD ? { card: { id } } : { sourceNodeId: id };

    const edge = await this.edgeRepository.findOne({
      where: condition,
      relations: { card: true },
    });

    return edge;
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    const result = await this.edgeRepository.delete({ id });

    return result;
  }
}
