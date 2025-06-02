import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as util from 'util';
import * as newrelic from 'newrelic';

@Injectable()
export class NewrelicInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(
      `Parent Interceptor before: ${util.inspect(context.getHandler().name) ?? ''}`,
    );
    return newrelic.startWebTransaction(context.getHandler().name, function () {
      const transaction = newrelic.getTransaction();
      // const now = Date.now();
      return next.handle().pipe(
        tap(() => {
          console.log(
            `Parent Interceptor after: ${util.inspect(
              context.getHandler().name,
            ) ?? ''}`,
          );
          return transaction.end();
        }),
      );
    });
  }
}