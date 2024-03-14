import { ApiProperty } from '@nestjs/swagger';

import { enumh } from '@/utils/helpers';
import { ActionedBaseDto } from '@/common/dto';

import { NodeTypeEnum } from '../enums';

export class GotNodeTypeDto extends ActionedBaseDto {
  @ApiProperty({
    enum: NodeTypeEnum,
    default: enumh.getFirstKey<typeof NodeTypeEnum>(NodeTypeEnum),
  })
  type: NodeTypeEnum;

  @ApiProperty({
    example: 'This is the start node',
  })
  desc: string;

  @ApiProperty({
    example: 1.2,
  })
  defaultX: number;

  @ApiProperty({
    example: 2.2,
  })
  defaultY: number;
}
