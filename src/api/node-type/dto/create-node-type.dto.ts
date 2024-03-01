import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { enumh } from '@/utils/helpers';

import { NodeTypeEnum } from '../enums';

export class CreateNodeTypeDto {
  @IsEnum(NodeTypeEnum)
  @ApiProperty({
    enum: NodeTypeEnum,
    default: enumh.getFirstKey<typeof NodeTypeEnum>(NodeTypeEnum),
  })
  type: NodeTypeEnum;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'This is the start node',
  })
  desc: string;

  @IsNumber()
  @ApiProperty({
    example: 1.2,
  })
  defaultX: number;

  @IsNumber()
  @ApiProperty({
    example: 2.2,
  })
  defaultY: number;
}
