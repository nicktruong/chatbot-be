import {
  Get,
  Put,
  Post,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
  SetMetadata,
  RequestMethod,
  UseInterceptors,
  applyDecorators,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';

import type { CustomDecorator } from '@nestjs/common';

import { LocalAuthGuard } from '@/api/auth/guards';
import { TransformInterceptor } from '@/interceptors';
import { IS_PUBLIC_KEY, ROLES_KEY } from '@/utils/constants';

import type { UserRole } from '@/common/enums';
import type { ClassType } from '@/common/interfaces';

import { SwaggerApi } from './swagger.decorator';

import type { ISwaggerParams } from './swagger.decorator';

export interface IRouteParams<T = any> {
  path: string;
  code?: number;
  method: number;
  roles?: UserRole[];
  jwtSecure?: boolean;
  localSecure?: boolean;
  responseType?: ClassType<T>;
  swaggerInfo?: ISwaggerParams;
}

function Public(): CustomDecorator<string> {
  return SetMetadata(IS_PUBLIC_KEY, true);
}

export function UserRoles(roles: UserRole[]): CustomDecorator<string> {
  return SetMetadata(ROLES_KEY, roles);
}

export function InjectRoute({
  path = '/',
  roles = [],
  responseType,
  jwtSecure = true,
  localSecure = false,
  code = HttpStatus.OK,
  method = RequestMethod.GET,
  swaggerInfo = { secure: true },
}: IRouteParams) {
  const methodDecorator = {
    [RequestMethod.GET]: Get,
    [RequestMethod.PUT]: Put,
    [RequestMethod.POST]: Post,
    [RequestMethod.DELETE]: Delete,
  };

  const decorators = [
    methodDecorator[method](path),
    HttpCode(code),
    SwaggerApi({ secure: jwtSecure, ...swaggerInfo }),
  ];

  if (roles.length > 0) {
    decorators.push(UserRoles(roles));
  }

  if (!jwtSecure) {
    decorators.push(Public());
  }

  if (localSecure) {
    decorators.push(UseGuards(LocalAuthGuard));
  }

  if (responseType) {
    decorators.push(UseInterceptors(new TransformInterceptor(responseType)));
  }

  return applyDecorators(...decorators);
}

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
