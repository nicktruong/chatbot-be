import { HttpStatus, RequestMethod } from '@nestjs/common';

import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';

import { GotNodeDto, CreatedNodeDto, ChangedPositionDto } from './dto';

export default {
  index: 'nodes',
  create: <IRouteParams>{
    path: '/',
    code: HttpStatus.CREATED,
    method: RequestMethod.POST,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.CREATED, type: CreatedNodeDto }],
    },
  },
  getAll: <IRouteParams>{
    path: '/:flowId',
    method: RequestMethod.GET,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: GotNodeDto, isArray: true }],
    },
  },
  changePosition: <IRouteParams>{
    path: '/change-position/:nodeId',
    method: RequestMethod.PUT,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: ChangedPositionDto }],
    },
  },
};
