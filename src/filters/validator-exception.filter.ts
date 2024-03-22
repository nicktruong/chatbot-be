import { Catch, HttpStatus } from '@nestjs/common';

import type { Response } from 'express';
import type { ValidationError } from 'class-validator';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

import { Exception } from '@/utils/constants';
import { ValidatorException } from '@/exceptions';
import { isDevelopmentEnv, validator } from '@/utils/helpers';

import type { IBaseExceptionResponse } from '@/exceptions';

export interface IValidatorExceptionResponse extends IBaseExceptionResponse {
  detail?: Record<string, string[]>;
}

@Catch(ValidatorException)
export class ValidatorExceptionFilter implements ExceptionFilter {
  catch(
    exception: ValidatorException,
    host: ArgumentsHost,
  ): Response<IBaseExceptionResponse> {
    const isDevelopment = isDevelopmentEnv();

    const response = host.switchToHttp().getResponse<Response>();

    try {
      // TODO: Re-Type exception
      const { errors } = exception as unknown as {
        errors: ValidationError[];
      };

      const { firstError, detail, dto } =
        validator.extractValidationErrorDetail(errors);

      let resBody = <IValidatorExceptionResponse>{
        code: Exception.BAD_REQUEST_CODE,
        status: HttpStatus.BAD_REQUEST,
        message: firstError?.[0] || 'Invalid Information',
      };

      if (isDevelopment) {
        resBody = {
          ...resBody,
          message: `${firstError?.[0]} Invalid Attribute(s) in ${dto}`,
          detail,
        };
      }

      return response.status(422).send(resBody);
    } catch (error) {
      const resBody = <IBaseExceptionResponse>{
        code: Exception.INTERNAL_ERROR_CODE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong!',
      };

      if (isDevelopment) {
        resBody.stack = error?.stack;
        resBody.message = error?.message;
      }

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(resBody);
    }
  }
}
