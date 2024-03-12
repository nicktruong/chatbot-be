import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FlowType } from './entities';
import { GetFlowTypeDto, CreateFlowTypeDto } from './dto';
import { FlowTypeRepository } from './flow-type.repository';

@Injectable()
export class FlowTypeService {
  constructor(
    @InjectRepository(FlowType)
    private flowTypeRepository: FlowTypeRepository,
  ) {}

  public async create(data: CreateFlowTypeDto): Promise<FlowType> {
    const flowType = this.flowTypeRepository.create(data);

    await this.flowTypeRepository.save(flowType);

    return flowType;
  }

  public async getByType(data: GetFlowTypeDto): Promise<FlowType> {
    const flowType = await this.flowTypeRepository.findOneBy({
      type: data.type,
    });

    return flowType;
  }
}
