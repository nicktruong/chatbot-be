import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod } from '@nestjs/common';
import { GotCardTypeDto } from './dto/got-card-type.dto';

export default {
  index: 'card-types',
  getAll: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [
        { status: HttpStatus.OK, type: GotCardTypeDto, isArray: true },
      ],
    },
  },
};
