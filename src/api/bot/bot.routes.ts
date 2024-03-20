import { HttpStatus, RequestMethod } from '@nestjs/common';

import { UserRole } from '@/common/enums';
import type { IRouteParams } from '@/decorators';

import { CreatedBotDto, GotBotDto } from './dto';

export default {
  index: 'bots',
  create: <IRouteParams>{
    path: '/',
    code: HttpStatus.CREATED,
    method: RequestMethod.POST,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.CREATED, type: CreatedBotDto }],
    },
    responseType: CreatedBotDto,
  },
  getAll: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: GotBotDto, isArray: true }],
    },
    responseType: GotBotDto,
  },
  deleteById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.DELETE,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [
        {
          status: HttpStatus.OK,
          schema: { type: 'number', example: 1 },
        },
      ],
    },
  },
};
