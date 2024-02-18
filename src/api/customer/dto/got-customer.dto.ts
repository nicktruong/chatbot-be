import { ApiProperty } from '@nestjs/swagger';

import { enumh } from '@/utils/helpers';
import { UserRole } from '@/common/enums';
import { ActionedBaseDto } from '@/common/dto';

class GotCustomerSessionDto extends ActionedBaseDto {}

export class GotCustomerDto extends ActionedBaseDto {
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

export class GotCustomerDetailDto extends GotCustomerDto {
  @ApiProperty({ isArray: true })
  sessions: GotCustomerSessionDto[];
}
