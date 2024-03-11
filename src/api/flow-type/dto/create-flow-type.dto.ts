import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsNotEmpty, IsOptional } from 'class-validator';

import { enumh } from '@/utils/helpers';

import { FlowTypeEnum } from '../enums';

export class CreateFlowTypeDto {
  @IsEnum(FlowTypeEnum)
  @ApiProperty({
    enum: FlowTypeEnum,
    default: enumh.getFirstKey<typeof FlowTypeEnum>(FlowTypeEnum),
  })
  type: FlowTypeEnum;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    example: 'This is the main flow',
  })
  desc: string;
}
