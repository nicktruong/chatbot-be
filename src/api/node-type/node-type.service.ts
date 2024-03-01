import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { NodeType } from './entities';
import { NodeTypeEnum } from './enums';
import { NodeTypeRepository } from './node-type.repository';
import { CreateNodeTypeDto, CreatedNodeTypeDto, GotNodeTypeDto } from './dto';

@Injectable()
export class NodeTypeService {
  constructor(
    @InjectRepository(NodeType) private nodeTypeRepository: NodeTypeRepository,
  ) {}

  public async create(data: CreateNodeTypeDto): Promise<CreatedNodeTypeDto> {
    const nodeType = this.nodeTypeRepository.create(data);
    await this.nodeTypeRepository.save(nodeType);

    return nodeType;
  }

  public async findByType(type: NodeTypeEnum): Promise<GotNodeTypeDto> {
    const nodeType = await this.nodeTypeRepository.findOneBy({ type });

    return nodeType;
  }
}
