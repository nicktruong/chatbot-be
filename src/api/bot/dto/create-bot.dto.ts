import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBotDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    format: 'uuid',
    example: '15489892-ef5c-46ec-a2d8-ff5300808f87',
  })
  creatorId: string;
}
