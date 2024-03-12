import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { FlowTypeEnum } from '../enums';

export class GetFlowTypeDto {
  @IsEnum(FlowTypeEnum)
  @ApiProperty({
    enum: FlowTypeEnum,
  })
  type: FlowTypeEnum;
}
