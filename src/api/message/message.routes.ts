import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod } from '@nestjs/common';
import { Schedule } from './entities';

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
};
