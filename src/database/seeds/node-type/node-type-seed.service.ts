import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { NodeType } from '@/api/node-type/entities';
import { NodeTypeEnum } from '@/api/node-type/enums';
import { NodeTypeRepository } from '@/api/node-type/node-type.repository';

@Injectable()
export class NodeTypeSeedService {
  constructor(
    @InjectRepository(NodeType) private repository: NodeTypeRepository,
  ) {}

  async run() {
    const countNodeType = await this.repository.count();

    if (!countNodeType) {
      await this.repository.save(
        this.repository.create({
          defaultX: 500,
          defaultY: 200,
          type: NodeTypeEnum.START,
          desc: 'This is the beginning of a new conversation.',
        }),
      );
      await this.repository.save(
        this.repository.create({
          defaultX: 800,
          defaultY: 200,
          type: NodeTypeEnum.END,
          desc: 'When a user reaches this node, the conversation is ended and the user is redirected to the "Conversation End" workflow.',
        }),
      );
      await this.repository.save(
        this.repository.create({
          defaultX: 500,
          defaultY: 600,
          type: NodeTypeEnum.CUSTOM,
          desc: 'Add instructions (send content, execute code or ask for information) and transitions on this node',
        }),
      );
      await this.repository.save(
        this.repository.create({
          defaultX: 800,
          defaultY: 600,
          type: NodeTypeEnum.EVENT,
          desc: '',
        }),
      );
    }
  }
}
