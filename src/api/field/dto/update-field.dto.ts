import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFieldDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'always',
  })
  value: string;
}
