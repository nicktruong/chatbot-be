import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateDefaultsDto {
  @IsUUID()
  @ApiProperty({
    example: '353d6e1a-492b-40b1-be6e-2a08d7f782dc',
  })
  cardId: string;

  @IsUUID()
  @ApiProperty({
    example: '353d6e1a-492b-40b1-be6e-2a08d7f782dc',
  })
  cardTypeId: string;
}
