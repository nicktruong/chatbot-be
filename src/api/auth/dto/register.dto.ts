import {
  IsEmail,
  Matches,
  IsString,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { enumh } from '@/utils/helpers';
import { UserRole } from '@/common/enums';

enum UserRegisterRole {
  CUSTOMER = UserRole.CUSTOMER,
}

const UserRegisterRoleRegex =
  enumh.convertToRegex<typeof UserRegisterRole>(UserRegisterRole);

export class RegisterDto {
  @IsNotEmpty()
  @Matches(UserRegisterRoleRegex, 'i', {
    message: `$property must match ${UserRegisterRoleRegex}.`,
  })
  @ApiProperty({
    enum: UserRegisterRole,
    default: enumh.getFirstKey(UserRegisterRole),
  })
  role: UserRole;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    format: 'email',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ format: 'password', example: 'P@ssw0rd' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Lorem' })
  name: string;
}
