import { ApiProperty } from '@nestjs/swagger';

import { enumh } from '@/utils/helpers';
import { ActionedBaseDto } from '@/common/dto';

import { FieldTypeEnum } from '../field-type.enum';

export class GotFieldTypeDto extends ActionedBaseDto {
  @ApiProperty({
    enum: FieldTypeEnum,
    default: enumh.getFirstKey<typeof FieldTypeEnum>(FieldTypeEnum),
  })
  type: FieldTypeEnum;

  @ApiProperty({ example: 'Lorem' })
  question: string;
}
