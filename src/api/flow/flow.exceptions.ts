import { BadRequestException } from '@nestjs/common';

export class DuplicateUniqueFlowException extends BadRequestException {
  constructor() {
    super('This flow can only be created one.');
  }
}
