import {
  Logger,
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('Interceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('Before reaching the handler...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => this.logger.log(`Response Lag... ${Date.now() - now}ms`)),
      );
  }
}
