import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as path from 'path';
import * as fs from 'fs';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { trace,context as otelContext } from '@opentelemetry/api';

@Injectable()
export class GraphQLMetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const span = trace.getSpan(otelContext.active());

    console.log(span) // ver que trae, para ver el error en una petición

    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    const fieldName = info.fieldName;
    const typeName = info.parentType.name;

    const startCPU = process.cpuUsage();
    const startMemHeap = process.memoryUsage().heapUsed;
    const startMem = process.memoryUsage().rss;

    const start = performance.now();

    return next.handle().pipe(
      tap(() => {

        const endMem = process.memoryUsage().rss;
        const endMemHeap = process.memoryUsage().heapUsed;
        const endCpu = process.cpuUsage(startCPU);
        const duration = performance.now() - start;

        const deltaMemMBHeap = (endMemHeap - startMemHeap) / 1024 / 1024;
        const deltaMemMB = (endMem - startMem) / 1024 / 1024; // MB
        const deltaCpuMS = (endCpu.user + endCpu.system) / 1000; // milisegundos

        // Exportar CSV, o enviar vía OTLP
        writeMetricsToCsv(deltaCpuMS, deltaMemMB, deltaMemMBHeap, `${typeName}.${fieldName}`);
      }),
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
      // catchError(err => {

      // })
    )
  }
}


const METRICS_FILE = path.resolve(__dirname, '../metrics.csv');

export function writeMetricsToCsv(cpuMs: number, memoryBytes: number, memoryBytesHeap: number, route: string) {
  const timestamp = Date.now();
  const lineCpu = `${timestamp},cpu.time,${cpuMs},ms,${route}`;
  const lineMem = `${timestamp},heap.used,${memoryBytes},MB,${memoryBytesHeap},MB,${route}`;

  fs.appendFileSync(METRICS_FILE, `${lineCpu}\n${lineMem}\n`);
}