import { ApiProperty } from '@nestjs/swagger';

export class GotEdgeDto {
  @ApiProperty({ example: '353d6e1a-492b-40b1-be6e-2a08d7f782dc' })
  sourceNodeId: string;

  @ApiProperty({ example: '353d6e1a-492b-40b1-be6e-2a08d7f782dc' })
  targetNodeId: string;

  @ApiProperty({ format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ format: 'date-time' })
  updatedAt: Date;
}
