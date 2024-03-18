import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Flow } from './entities';
import { CreateFlowDto } from './dto';
import { FlowRepository } from './flow.repository';
import { DuplicateUniqueFlowException } from './flow.exceptions';

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

  public async create(data: CreateFlowDto): Promise<Flow> {
    const flowType = await this.flowTypeService.getByType({
      type: data.flowType,
    });

    const count = await this.flowRepository.countBy({
      bot: { id: data.botId },
      flowType: { type: data.flowType },
    });

    // Only CUSTOM flow can be created more than one
    if (count > 0 && data.flowType !== FlowTypeEnum.CUSTOM) {
      throw new DuplicateUniqueFlowException();
    }

    const flow = this.flowRepository.create({
      bot: { id: data.botId },
      flowType: { id: flowType.id },
      name: data.name ?? `${DEFAULT_FLOW_NAME} ${count + 1}`,
    });
    await this.flowRepository.save(flow);

    return flow;
  }

  public async getAll(userId: string, botId: string): Promise<Flow[]> {
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

  public async getDefaultFlowByBotId(botId: string): Promise<Flow> {
    const flow = await this.flowRepository.findOne({
      where: { flowType: { type: FlowTypeEnum.MAIN }, bot: { id: botId } },
    });

    return flow;
  }

  public async getById(id: string): Promise<Flow> {
    const flow = await this.flowRepository.findOne({
      where: { id },
      relations: {
        flowType: true,
      },
    });

    return flow;
  }
}
