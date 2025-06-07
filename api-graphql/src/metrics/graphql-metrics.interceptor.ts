import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { metricsInterceptor } from './metrics.type';
import { writeMetricsToCsvInterceptor } from './push-metrics';

@Injectable()
export class GraphQLMetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    const fieldName = info.fieldName;
    const typeName = info.parentType.name;
    
    const startCpuUser = process.cpuUsage().user / 1000;
    const startCpuSystem = process.cpuUsage().system / 1000;
    const startMem = process.memoryUsage().rss / 1024 / 1024;

    const start = performance.now();

    return next.handle().pipe(
      tap(() => {
        const endCpuUser = process.cpuUsage().system / 1000;
        const endCpuSystem = process.cpuUsage().user / 1000;
        const endMem = process.memoryUsage().rss / 1024 / 1024;
        const duration = Number((performance.now() - start).toFixed(2));
        const timestamp = Date.now();

        const metrics: metricsInterceptor = {
          timestamp,
          startCpuUser,
          startCpuSystem,
          startMem,
          endCpuUser,
          endCpuSystem,
          endMem,
          duration,
          operationType: typeName,
          operation: fieldName,
          status: '200'
        }

        writeMetricsToCsvInterceptor(metrics);
      }),
      catchError(err => {

        const endCpuUser = process.cpuUsage().system / 1000;
        const endCpuSystem = process.cpuUsage().user / 1000;
        const endMem = process.memoryUsage().rss / 1024 / 1024;
        const duration = Number((performance.now() - start).toFixed(2));
        const timestamp = Date.now();

        const metrics: metricsInterceptor = {
          timestamp,
          startCpuUser,
          startCpuSystem,
          startMem,
          endCpuUser,
          endCpuSystem,
          endMem,
          duration,
          operationType: typeName,
          operation: fieldName,
          status: err.response.statusCode,
        }

        writeMetricsToCsvInterceptor(metrics);
        
        return throwError(() => err);
      }),
    )
  }
}