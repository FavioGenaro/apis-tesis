import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { metricsInterceptor } from './metrics.type';
import { pushMetricInterceptor } from './push-metrics';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    console.log('Iniciando interceptor')

    const response = context.switchToHttp().getResponse();
    const method = response.req.method;
    const route = response.req.route.path;

    console.log('Finalizar obtención de métricas de petición e iniciando métricas de CPU y MEM')

    const startCpuUser = process.cpuUsage().user / 1000;
    const startCpuSystem = process.cpuUsage().system / 1000;
    const startMem = process.memoryUsage().rss / 1024 / 1024;

    const start = performance.now();

    console.log('Finalizar recopilación de métricas iniciales')

    return next.handle().pipe(
      tap(() => {

        const status = '200';

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
          operationType: method,
          operation: route,
          status: '200',
        }

        console.log('Métricas recopiladas')

        pushMetricInterceptor(metrics).catch(console.error);
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
          operationType: method,
          operation: route,
          status: err?.response?.statusCode ?? '400',
        }

        console.log('Métricas recopiladas con Error')

        pushMetricInterceptor(metrics).catch(console.error);
        
        return throwError(() => err);
      }),
    );
  }
}