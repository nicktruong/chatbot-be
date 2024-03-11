import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { enumh } from '@/utils/helpers';

import { FlowTypeEnum } from '../enums';

export class GetFlowTypeDto {
  @IsEnum(FlowTypeEnum)
  @ApiProperty({
    enum: FlowTypeEnum,
    default: enumh.getFirstKey<typeof FlowTypeEnum>(FlowTypeEnum),
  })
  type: FlowTypeEnum;
}
