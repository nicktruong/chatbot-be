import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  NodeNotFound,
  FlowNotFound,
  NodeTypeNotFound,
  DuplicateUniqueNodeException,
} from './node.exceptions';
import { Node } from './entities';
import { NodeRepository } from './node.repository';
import { CreateNodeDto, ChangePositionDto, ChangedPositionDto } from './dto';

import { NodeTypeEnum } from '../node-type/enums';
import { FlowService } from '../flow/flow.service';
import { NodeTypeService } from '../node-type/node-type.service';

// TODO: Increment node name
const DEFAULT_NODE_NAME = 'Standard Node 1';

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(Node) private nodeRepository: NodeRepository,
    private flowService: FlowService,
    private nodeTypeService: NodeTypeService,
  ) {}

  public async create(data: CreateNodeDto): Promise<Node> {
    const flow = await this.flowService.getById(data.flowId);

    if (!flow) {
      throw new FlowNotFound();
    }

    const nodeType = await this.nodeTypeService.findByType(data.type);

    if (!nodeType) {
      throw new NodeTypeNotFound();
    }

    const count = await this.nodeRepository.countBy({
      flow: { id: data.flowId },
      nodeType: { type: data.type },
    });

    // Only CUSTOM flow can be created more than one
    if (count > 0 && data.type !== NodeTypeEnum.CUSTOM) {
      throw new DuplicateUniqueNodeException();
    }

    const defaultNode = await this.nodeTypeService.findByType(data.type);

    if (defaultNode) {
      data.x ??= defaultNode.defaultX;
      data.y ??= defaultNode.defaultY;
    }

    const node = this.nodeRepository.create({
      flow,
      nodeType,
      x: data.x,
      y: data.y,
      id: data.id,
      position: -1, // TODO: Change position
      name: DEFAULT_NODE_NAME,
    });

    await this.nodeRepository.save(node);

    return node;
  }

  public async getAll(flowId: string): Promise<Node[]> {
    const nodes = await this.nodeRepository.find({
      where: { flow: { id: flowId } },
      relations: { nodeType: true },
    });

    return nodes;
  }

  public async changePosition(
    nodeId: string,
    data: ChangePositionDto,
  ): Promise<ChangedPositionDto> {
    const node = await this.nodeRepository.find({ where: { id: nodeId } });

    if (!node) {
      throw new NodeNotFound();
    }

    await this.nodeRepository.update({ id: nodeId }, { x: data.x, y: data.y });

    return {
      x: data.x,
      y: data.y,
      updatedAt: new Date(),
    };
  }
}
