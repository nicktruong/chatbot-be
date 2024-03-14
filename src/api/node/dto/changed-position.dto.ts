import { ApiProperty } from '@nestjs/swagger';

export class ChangedPositionDto {
  @ApiProperty({ example: 1.2 })
  x: number;

  @ApiProperty({ example: 2.2 })
  y: number;

  @ApiProperty({ format: 'date-time' })
  updatedAt: Date;
}
