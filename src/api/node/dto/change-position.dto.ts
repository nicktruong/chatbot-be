import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePositionDto {
  @IsNumber()
  @ApiProperty({
    example: 1.2,
  })
  x: number;

  @IsNumber()
  @ApiProperty({
    example: 2.2,
  })
  y: number;
}
