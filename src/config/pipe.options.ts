import { ValidationError } from 'class-validator';
import { ValidationPipeOptions } from '@nestjs/common';

import { ValidatorException } from '@/exceptions';

export const getPipeOptions = (
  options?: ValidationPipeOptions,
): ValidationPipeOptions => {
  return {
    transform: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      return new ValidatorException({ errors: validationErrors });
    },
    ...options,
  };
};
