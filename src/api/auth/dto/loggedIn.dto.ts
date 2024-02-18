import { ApiProperty } from '@nestjs/swagger';

import { enumh } from '@/utils/helpers';
import { UserRole } from '@/common/enums';
import { ActionedBaseDto } from '@/common/dto';

class LoggedInUserInfoDto extends ActionedBaseDto {
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

export class LoggedInDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOjAsImlhdCI6MTY2MjYzMTkzOCwiZXhwIjoxNjY1MjIzOTM4fQ.d806NRcVKaBY1cAXjiMuJvLMg0DxTYdDkd269ETKnNU',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOjAsImlhdCI6MTY2MjYzMTkzOCwiZXhwIjoxNjY1MjIzOTM4fQ.d806NRcVKaBY1cAXjiMuJvLMg0DxTYdDkd269ETKnNU',
  })
  refreshToken: string;

  @ApiProperty()
  userInfo: LoggedInUserInfoDto;
}
