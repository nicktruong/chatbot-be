import { omit } from 'ramda';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Flow } from './entities';
import { FlowRepository } from './flow.repository';
import { CreateFlowDto, CreatedFlowDto, GotFlowDto } from './dto';

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
}
