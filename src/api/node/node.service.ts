import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Node } from './entities';
import { NodeRepository } from './node.repository';
import { CreateNodeDto, CreatedNodeDto } from './dto';
import { FlowNotFound, NodeTypeNotFound } from './node.exceptions';

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

  public async create(data: CreateNodeDto): Promise<CreatedNodeDto> {
    const flow = await this.flowService.getById(data.flowId);

    if (!flow) {
      throw new FlowNotFound();
    }

    const nodeType = await this.nodeTypeService.findByType(data.type);

    if (!nodeType) {
      throw new NodeTypeNotFound();
    }

    const node = this.nodeRepository.create({
      flow,
      nodeType,
      x: data.x,
      y: data.y,
      name: DEFAULT_NODE_NAME,
    });

    await this.nodeRepository.save(node);

    return node;
  }
}
