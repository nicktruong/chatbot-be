import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { enumh } from '@/utils/helpers';
import { FieldTypeEnum } from '@/api/field-type/field-type.enum';

export class CreateFieldDto {
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
  cardId: string;

  @IsEnum(FieldTypeEnum)
  @ApiProperty({
    enum: FieldTypeEnum,
    default: enumh.getFirstKey<typeof FieldTypeEnum>(FieldTypeEnum),
  })
  fieldType: FieldTypeEnum;
}
