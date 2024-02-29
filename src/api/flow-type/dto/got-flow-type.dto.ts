import { ApiProperty } from '@nestjs/swagger';

import { enumh } from '@/utils/helpers';
import { ActionedBaseDto } from '@/common/dto';

import { FlowTypeEnum } from '../enums';

export class GotFlowTypeDto extends ActionedBaseDto {
  @ApiProperty({
    enum: FlowTypeEnum,
    default: enumh.getFirstKey<typeof FlowTypeEnum>(FlowTypeEnum),
  })
  type: FlowTypeEnum;

  @ApiProperty({
    example: 'This is the main flow',
  })
  desc: string;
}
