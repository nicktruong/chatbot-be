import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FlowType } from './entities';
import { FlowTypeRepository } from './flow-type.repository';
import { CreateFlowTypeDto, CreatedFlowTypeDto } from './dto';

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
}
