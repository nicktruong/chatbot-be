import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FlowType } from '@/api/flow-type/entities';
import { FlowTypeEnum } from '@/api/flow-type/enums';
import { FlowTypeRepository } from '@/api/flow-type/flow-type.repository';

@Injectable()
export class FlowTypeSeedService {
  constructor(
    @InjectRepository(FlowType) private repository: FlowTypeRepository,
  ) {}

  async run() {
    const countFlowType = await this.repository.count();

    if (!countFlowType) {
      await this.repository.save(
        this.repository.create({
          type: FlowTypeEnum.MAIN,
          desc: 'This is the main workflow of your chatbot. It is executed when the user starts a conversation.',
        }),
      );
    }
  }
}
