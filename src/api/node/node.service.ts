import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOptionsRelations } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

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

  public async createDefaults(flowId: string) {
    await this.create({
      flowId,
      type: NodeTypeEnum.START,
    });

    await this.create({
      flowId,
      type: NodeTypeEnum.END,
    });
  }

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

    // Only CUSTOM node can be created more than one
    if (count > 0 && data.type !== NodeTypeEnum.CUSTOM) {
      throw new DuplicateUniqueNodeException();
    }

    const defaultNode = await this.nodeTypeService.findByType(data.type);

    if (defaultNode) {
      data.x ??= defaultNode.defaultX;
      data.y ??= defaultNode.defaultY;
    }

    let position = -1;
    if (nodeType.type === NodeTypeEnum.END) position = 2_147_483_647;
    else if (nodeType.type == NodeTypeEnum.START) position = -1;
    else position = count;

    const node = this.nodeRepository.create({
      flow,
      nodeType,
      position,
      x: data.x,
      y: data.y,
      id: data.id,
      name: DEFAULT_NODE_NAME,
    });

    await this.nodeRepository.save(node);

    return node;
  }

  public async getAll(
    flowId: string,
    relations?: FindOptionsRelations<Node>,
  ): Promise<Node[]> {
    const nodes = await this.nodeRepository.find({
      where: { flow: { id: flowId } },
      relations: { nodeType: true, ...relations },
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

  public async deleteById(id: string): Promise<DeleteResult> {
    const node = await this.nodeRepository.findOne({
      where: { id },
      relations: { nodeType: true },
    });

    if (!node) {
      throw new NodeNotFound();
    }

    if ([NodeTypeEnum.START, NodeTypeEnum.END].includes(node.nodeType.type)) {
      throw new BadRequestException('Can not delete start and end nodes');
    }

    const result = await this.nodeRepository.delete({ id });

    return result;
  }
}
