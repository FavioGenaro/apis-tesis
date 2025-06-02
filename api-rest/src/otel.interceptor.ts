import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { cpuUsedHistogram, heapUsedHistogram } from './telemetry';
import { writeMetricsToCsv } from './csv-exporters';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Captura CPU y memoria antes de procesar la petición
    const memoryBefore = process.memoryUsage().heapUsed;

    const cpuBefore = process.cpuUsage();

    return next.handle().pipe(
      tap(() => {
        // Después de procesar la petición
        const memoryAfter = process.memoryUsage().heapUsed;
        const cpuAfter = process.cpuUsage();

        const usedMemory = memoryAfter - memoryBefore;
        const usedCpu =
          (cpuAfter.user + cpuAfter.system - cpuBefore.user - cpuBefore.system) /
          1000;

        heapUsedHistogram.record(usedMemory, {
          route: context.switchToHttp().getRequest().url,
        });

        cpuUsedHistogram.record(usedCpu, {
          route: context.switchToHttp().getRequest().url,
        });

        const request = context.switchToHttp().getRequest();
        const route = request.url;

        writeMetricsToCsv(usedCpu, usedMemory, route);
      }),
    );
  }
}
