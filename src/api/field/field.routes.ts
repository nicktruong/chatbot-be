import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod } from '@nestjs/common';

import { Field } from './entities';

export default {
  index: 'fields',
  update: <IRouteParams>{
    path: '/:fieldId',
    method: RequestMethod.PUT,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK }],
    },
  },
  getCardFields: <IRouteParams>{
    path: '/:cardId',
    method: RequestMethod.GET,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: Field, isArray: true }],
    },
  },
};
