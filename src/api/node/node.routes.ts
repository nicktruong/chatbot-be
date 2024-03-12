import { HttpStatus, RequestMethod } from '@nestjs/common';

import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';

import { Node } from './entities';
import { ChangedPositionDto } from './dto';

export default {
  index: 'nodes',
  create: <IRouteParams>{
    path: '/',
    code: HttpStatus.CREATED,
    method: RequestMethod.POST,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.CREATED, type: Node }],
    },
  },
  getAll: <IRouteParams>{
    path: '/:flowId',
    method: RequestMethod.GET,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: Node, isArray: true }],
    },
  },
  changePosition: <IRouteParams>{
    path: '/:nodeId/position',
    method: RequestMethod.PUT,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: ChangedPositionDto }],
    },
  },
};
