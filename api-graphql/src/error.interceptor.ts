import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { trace, context as otelContext, SpanStatusCode } from '@opentelemetry/api';
import { writeMetricsToCsv } from './graphql-metrics.interceptor';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ErrorTracingInterceptor implements NestInterceptor {
  intercept(execContext: ExecutionContext, next: CallHandler): Observable<any> {
    const span = trace.getSpan(otelContext.active());

    const ctx = GqlExecutionContext.create(execContext);
    const info = ctx.getInfo();
    const fieldName = info.fieldName;
    const typeName = info.parentType.name;

    const startCPU = process.cpuUsage();
    const startMemHeap = process.memoryUsage().heapUsed;
    const startMem = process.memoryUsage().rss;
    const start = performance.now();

    return next.handle().pipe(
      catchError(err => {
        if (span) {

          const endMem = process.memoryUsage().rss;
          const endMemHeap = process.memoryUsage().heapUsed;
          const endCpu = process.cpuUsage(startCPU);
          const duration = performance.now() - start;

          const deltaMemMBHeap = (endMemHeap - startMemHeap) / 1024 / 1024;
          const deltaMemMB = (endMem - startMem) / 1024 / 1024;
          const deltaCpuMS = (endCpu.user + endCpu.system) / 1000;

          // Exportar CSV, o enviar vía OTLP
          writeMetricsToCsv(deltaCpuMS, deltaMemMB, deltaMemMBHeap, `${typeName}.${fieldName}-ERROR`);
        }
        return throwError(() => err);
      }),
    );
  }
}
