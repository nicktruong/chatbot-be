import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdatedFieldDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'always',
  })
  value: string;

  @IsUUID()
  @ApiProperty({
    example: '353d6e1a-492b-40b1-be6e-2a08d7f782dc',
  })
  fieldId: string;
}
