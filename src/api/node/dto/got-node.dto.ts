import { ApiProperty } from '@nestjs/swagger';

import { GotCardDto } from '@/api/card/dto';
import { ActionedBaseDto } from '@/common/dto';
import { GotNodeTypeDto } from '@/api/node-type/dto';

export class GotNodeDto extends ActionedBaseDto {
  @ApiProperty({ example: 1.2 })
  x: number;

  @ApiProperty({ example: 2.2 })
  y: number;

  @ApiProperty({ example: 'Standard 1' })
  name: string;

  @ApiProperty()
  nodeType: GotNodeTypeDto;

  @ApiProperty()
  cards: GotCardDto[];
}
