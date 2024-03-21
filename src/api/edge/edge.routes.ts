import { HttpStatus, RequestMethod } from '@nestjs/common';

import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';

import { Edge } from './entities';

export default {
  index: 'edges',
  createOrUpdate: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.CREATED, type: Edge }],
    },
  },
  getByCardOrNodeId: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.GET,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: Edge }],
    },
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
