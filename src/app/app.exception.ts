import { Reflector } from '@nestjs/core';
import type { INestApplication } from '@nestjs/common';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

import { getPipeOptions } from '@/config';
import { AdvancedExceptionFilter, ValidatorExceptionFilter } from '@/filters';

export const loadErrorHandling = (app: INestApplication): void => {
  app.useGlobalPipes(new ValidationPipe(getPipeOptions()));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalFilters(
    new AdvancedExceptionFilter(),
    new ValidatorExceptionFilter(),
  );
};
