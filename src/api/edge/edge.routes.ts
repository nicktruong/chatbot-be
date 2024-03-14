import { HttpStatus, RequestMethod } from '@nestjs/common';

import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';

import { CreatedEdgeDto, GotEdgeDto } from './dto';

export default {
  index: 'edges',
  createOrUpdate: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.CREATED, type: CreatedEdgeDto }],
    },
  },
  getByCardOrNodeId: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.GET,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: GotEdgeDto }],
    },
  },
};
