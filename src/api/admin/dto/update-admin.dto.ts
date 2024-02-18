import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAdminDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    format: 'password',
    required: false,
  })
  password?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  name?: string;
}
