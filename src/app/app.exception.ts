import { ValidationPipe, type INestApplication } from '@nestjs/common';

import { getPipeOptions } from '@/config';
import { AdvancedExceptionFilter, ValidatorExceptionFilter } from '@/filters';

export const loadErrorHandling = (app: INestApplication): void => {
  app.useGlobalPipes(new ValidationPipe(getPipeOptions()));

  app.useGlobalFilters(
    new AdvancedExceptionFilter(),
    new ValidatorExceptionFilter(),
  );
};
