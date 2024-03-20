import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod } from '@nestjs/common';

import { Message, Schedule } from './entities';

export default {
  index: 'messages',
  schedule: <IRouteParams>{
    path: '/schedule',
    code: HttpStatus.CREATED,
    method: RequestMethod.POST,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.CREATED, type: Schedule }],
    },
  },
  getAll: <IRouteParams>{
    path: '/:botId',
    method: RequestMethod.GET,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: Message, isArray: true }],
    },
  },
};
