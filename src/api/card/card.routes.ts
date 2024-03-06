import { HttpStatus, RequestMethod } from '@nestjs/common';

import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';

import { CreatedCardDto } from './dto';

export default {
  index: 'cards',
  create: <IRouteParams>{
    path: '/',
    code: HttpStatus.CREATED,
    method: RequestMethod.POST,
    roles: [UserRole.CUSTOMER],
    swaggerInfo: {
      responses: [{ status: HttpStatus.CREATED, type: CreatedCardDto }],
    },
  },
};
