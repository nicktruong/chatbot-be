import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  GetFlowTypeDto,
  GotFlowTypeDto,
  CreateFlowTypeDto,
  CreatedFlowTypeDto,
} from './dto';
import { FlowType } from './entities';
import { FlowTypeRepository } from './flow-type.repository';

@Injectable()
export class FlowTypeService {
  constructor(
    @InjectRepository(FlowType)
    private flowTypeRepository: FlowTypeRepository,
  ) {}

  public async create(data: CreateFlowTypeDto): Promise<CreatedFlowTypeDto> {
    const flowType = this.flowTypeRepository.create(data);
    await this.flowTypeRepository.save(flowType);
    return flowType;
  }

  public async getByType(data: GetFlowTypeDto): Promise<GotFlowTypeDto> {
    const flowType = await this.flowTypeRepository.findOneBy({
      type: data.type,
    });
    return flowType;
  }
}
