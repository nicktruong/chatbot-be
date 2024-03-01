import { omit } from 'ramda';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Flow } from './entities';
import { FlowRepository } from './flow.repository';
import { DuplicateUniqueFlowException } from './flow.exceptions';
import { CreateFlowDto, CreatedFlowDto, GotFlowDto } from './dto';

import { FlowTypeEnum } from '../flow-type/enums';
import { FlowTypeService } from '../flow-type/flow-type.service';

// TODO: Auto increment flow name
// E.g. New Workflow 1, New Workflow 2,...
const DEFAULT_FLOW_NAME = 'New Workflow';

@Injectable()
export class FlowService {
  constructor(
    @InjectRepository(Flow)
    private flowRepository: FlowRepository,
    private flowTypeService: FlowTypeService,
  ) {}

  public async create(data: CreateFlowDto): Promise<CreatedFlowDto> {
    const flowType = await this.flowTypeService.getByType({
      type: data.flowType,
    });

    const count = await this.flowRepository.countBy({
      flowType: { type: data.flowType },
    });

    // Only CUSTOM flow can be created more than one
    if (count > 0 && data.flowType !== FlowTypeEnum.CUSTOM) {
      throw new DuplicateUniqueFlowException();
    }

    const flow = this.flowRepository.create({
      bot: { id: data.botId },
      flowType: { id: flowType.id },
      name: data.name ?? DEFAULT_FLOW_NAME,
    });
    await this.flowRepository.save(flow);

    return omit(['bot'], { ...flow, flowType });
  }

  public async getAll(userId: string, botId: string): Promise<GotFlowDto[]> {
    const flows = await this.flowRepository.find({
      where: {
        bot: {
          id: botId,
          creator: {
            id: userId,
          },
        },
      },
      relations: {
        flowType: true,
      },
    });

    return flows;
  }

  public async getById(id: string): Promise<GotFlowDto> {
    const flow = await this.flowRepository.findOne({
      where: { id },
      relations: {
        flowType: true,
      },
    });

    return flow;
  }
}
