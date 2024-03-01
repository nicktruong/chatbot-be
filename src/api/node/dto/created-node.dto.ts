import { ApiProperty } from '@nestjs/swagger';

import { GotFlowDto } from '@/api/flow/dto';
import { ActionedBaseDto } from '@/common/dto';
import { GotNodeTypeDto } from '@/api/node-type/dto';

export class CreatedNodeDto extends ActionedBaseDto {
  @ApiProperty({ example: 1.2 })
  x: number;

  @ApiProperty({ example: 2.2 })
  y: number;

  @ApiProperty({ example: 'Standard 1' })
  name: string;

  @ApiProperty()
  flow: GotFlowDto;

  @ApiProperty()
  nodeType: GotNodeTypeDto;
}
