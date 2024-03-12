import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsNotEmpty } from 'class-validator';

import { FlowTypeEnum } from '../enums';

export class CreateFlowTypeDto {
  @IsEnum(FlowTypeEnum)
  @ApiProperty({
    enum: FlowTypeEnum,
  })
  type: FlowTypeEnum;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'This is the main flow',
  })
  desc: string;
}
