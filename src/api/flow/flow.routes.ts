import { HttpStatus, RequestMethod } from '@nestjs/common';

import { UserRole } from '@/common/enums';
import type { IRouteParams } from '@/decorators';

import { CreatedFlowDto, GotFlowDto } from './dto';

export default {
  index: 'flows',
  create: <IRouteParams>{
    path: '/',
    code: HttpStatus.CREATED,
    method: RequestMethod.POST,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.CREATED, type: CreatedFlowDto }],
    },
  },
  getAll: <IRouteParams>{
    path: '/:botId',
    method: RequestMethod.GET,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: GotFlowDto, isArray: true }],
    },
  },
};
