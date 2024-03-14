import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @IsUUID()
  @ApiProperty({
    example: '353d6e1a-492b-40b1-be6e-2a08d7f782dc',
  })
  nodeId: string;

  @IsUUID()
  @ApiProperty({
    example: '353d6e1a-492b-40b1-be6e-2a08d7f782dc',
  })
  cardTypeId: string;
}
