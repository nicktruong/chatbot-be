import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class CreateEdgeDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({ example: '353d6e1a-492b-40b1-be6e-2a08d7f782dc' })
  cardId: string;

  @IsUUID()
  @ApiProperty({ example: '353d6e1a-492b-40b1-be6e-2a08d7f782dc' })
  sourceNodeId: string;

  @IsUUID()
  @ApiProperty({ example: '353d6e1a-492b-40b1-be6e-2a08d7f782dc' })
  targetNodeId: string;
}
