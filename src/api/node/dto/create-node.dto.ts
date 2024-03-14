import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { enumh } from '@/utils/helpers';
import { NodeTypeEnum } from '@/api/node-type/enums';

export class CreateNodeDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: '353d6e1a-492b-40b1-be6e-2a08d7f782dc',
  })
  id?: string;

  @IsEnum(NodeTypeEnum)
  @ApiProperty({
    enum: NodeTypeEnum,
    default: enumh.getFirstKey<typeof NodeTypeEnum>(NodeTypeEnum),
  })
  type: NodeTypeEnum;

  @IsNumber()
  @ApiProperty({
    example: 1.2,
  })
  x?: number;

  @IsNumber()
  @ApiProperty({
    example: 2.2,
  })
  y?: number;

  @IsUUID()
  @ApiProperty({
    example: '353d6e1a-492b-40b1-be6e-2a08d7f782dc',
  })
  flowId: string;
}
