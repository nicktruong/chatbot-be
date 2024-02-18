import { Matches } from 'class-validator';
import { applyDecorators } from '@nestjs/common';

import { Regex } from '@/utils/constants';

export function IsValidUserRole() {
  return applyDecorators(
    Matches(Regex.USER_ROLE, 'i', {
      message: `$property must match ${Regex.USER_ROLE}.`,
    }),
  );
}
