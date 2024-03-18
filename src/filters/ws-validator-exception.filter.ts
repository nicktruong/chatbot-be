import { WsException } from '@nestjs/websockets';
import { ValidationError } from 'class-validator';
import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';

import { SocketServer } from '@/api/chat/chat.interfaces';
import { isDevelopmentEnv, validator } from '@/utils/helpers';

export interface IWsValidatorExceptionResponse {
  message: string;
  stack?: string;
  detail?: Record<string, string[]>;
}

@Catch(WsException, HttpException)
export class WsValidatorExceptionsFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const isDevelopment = isDevelopmentEnv();

    const client = host.switchToWs().getClient() as SocketServer;

    try {
      const { errors } = exception as unknown as {
        errors: ValidationError[];
      };

      const { firstError, detail, dto } =
        validator.extractValidationErrorDetail(errors);

      const res = <IWsValidatorExceptionResponse>{
        message: firstError?.[0] || 'Invalid Information',
      };

      if (isDevelopment) {
        res.detail = detail;
        res.message = `${firstError?.[0]} Invalid Attribute(s) in ${dto}`;
      }

      client.emit('error', res);
    } catch (error) {
      const res = <IWsValidatorExceptionResponse>{
        message: 'Something went wrong!',
      };

      if (isDevelopment) {
        res.stack = error?.stack;
        res.message = error?.message;
      }

      client.emit('error', res);
    }
  }
}
