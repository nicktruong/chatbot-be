import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FieldType } from './entities';
import { GotFieldTypeDto } from './dto';
import { FieldTypeEnum } from './field-type.enum';
import { FieldTypeRepository } from './field-type.repository';

@Injectable()
export class FieldTypeService {
  constructor(
    @InjectRepository(FieldType)
    private fieldTypeRepository: FieldTypeRepository,
  ) {}

  public async getByType(type: FieldTypeEnum): Promise<GotFieldTypeDto> {
    const fieldType = await this.fieldTypeRepository.findOneBy({ type });

    return fieldType;
  }
}
