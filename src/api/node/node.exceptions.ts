import { NotFoundException } from '@nestjs/common';

export class FlowNotFound extends NotFoundException {
  constructor() {
    super('Flow not found.');
  }
}

export class NodeTypeNotFound extends NotFoundException {
  constructor() {
    super('NodeType not found.');
  }
}
