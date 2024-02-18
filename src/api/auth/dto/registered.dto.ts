import { ApiProperty } from '@nestjs/swagger';

import { enumh } from '@/utils/helpers';
import { UserRole } from '@/common/enums';
import { ActionedBaseDto } from '@/common/dto';

export class RegisteredDto extends ActionedBaseDto {
  @ApiProperty({
    enum: UserRole,
    default: enumh.getFirstKey<typeof UserRole>(UserRole),
  })
  role: UserRole;

  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({ example: 'Lorem' })
  name: string;
}
