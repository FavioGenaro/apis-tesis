import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { metricsInterceptor } from './metrics.type';
import { pushMetricInterceptor } from './push-metrics';

@Injectable()
export class GraphQLMetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    console.log('Iniciando interceptor')

    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    const fieldName = info.fieldName;
    const typeName = info.parentType.name;
    
    console.log('Finalizar obtención de métricas de petición e iniciando métricas de CPU y MEM')

    const startCpuUser = process.cpuUsage().user / 1000;
    const startCpuSystem = process.cpuUsage().system / 1000;
    const startMem = process.memoryUsage().rss / 1024 / 1024;

    const start = performance.now();

    console.log('Finalizar recopilación de métricas iniciales')

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

        console.log('Métricas recopiladas')

        pushMetricInterceptor(metrics).catch(console.error)

      }),
      catchError((err) => {

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

        console.log('Métricas recopiladas con Error')

        pushMetricInterceptor(metrics).catch(console.error);
        
        return throwError(() => err);
      }),
    )
  }
}