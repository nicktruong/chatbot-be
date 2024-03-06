import { ApiProperty } from '@nestjs/swagger';
import { ActionedBaseDto } from '@/common/dto';

export class CreatedCardDto extends ActionedBaseDto {
  @ApiProperty({ example: 0 })
  position: number;

  @ApiProperty({ format: 'uuid' })
  nodeId: string;

  @ApiProperty({ format: 'uuid' })
  cardTypeId: string;
}