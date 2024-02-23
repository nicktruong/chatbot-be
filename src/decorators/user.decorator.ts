import { createParamDecorator } from '@nestjs/common';

import type { ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
