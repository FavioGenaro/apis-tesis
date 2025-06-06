import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const response = context.switchToHttp().getResponse();
    const method = response.req.method;
    const route = response.req.route.path;

    const startCpuUser = process.cpuUsage().user / 1000;
    const startCpuSystem = process.cpuUsage().system / 1000;
    const startMem = process.memoryUsage().rss / 1024 / 1024;

    const start = performance.now();

    return next.handle().pipe(
      tap(() => {

        const status = response.statusCode.toString();

        const endCpuUser = process.cpuUsage().system / 1000;
        const endCpuSystem = process.cpuUsage().user / 1000;
        const endMem = process.memoryUsage().rss / 1024 / 1024;
        const duration = Number((performance.now() - start).toFixed(2));

        const metrics: metricsInterceptor = {
          startCpuUser,
          startCpuSystem,
          startMem,
          endCpuUser,
          endCpuSystem,
          endMem,
          duration,
          operationType: method,
          operation: route,
          status: status ?? '200',
        }

        writeMetricsToCsv(metrics);
      }),
      catchError(err => {

        const endCpuUser = process.cpuUsage().system / 1000;
        const endCpuSystem = process.cpuUsage().user / 1000;
        const endMem = process.memoryUsage().rss / 1024 / 1024;
        const duration = Number((performance.now() - start).toFixed(2));

        const metrics: metricsInterceptor = {
          startCpuUser,
          startCpuSystem,
          startMem,
          endCpuUser,
          endCpuSystem,
          endMem,
          duration,
          operationType: method,
          operation: route,
          status: err.response.statusCode,
        }

        writeMetricsToCsv(metrics);
        
        return throwError(() => err);
      }),
    );
  }
}

interface metricsInterceptor {
  startCpuUser: number;
  startCpuSystem: number;
  startMem: number;
  endCpuUser: number;
  endCpuSystem: number;
  endMem: number;
  duration: number;
  operationType: string;
  operation: string;
  status: string;
}

const METRICS_FILE = path.resolve(__dirname, '../../metrics_request.csv');

export function writeMetricsToCsv(metrics: metricsInterceptor) {

  const filePath = path.join(process.cwd(), '../../metrics_request.csv');

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, 'timestamp,metric,startValue,endValue,unit,operationType,operation,status\n');
  }

  const timestamp = Date.now();
  const lineCpuSystem = `${timestamp},cpu.system.time,${metrics.startCpuSystem},${metrics.endCpuSystem},ms,${metrics.operationType},${metrics.operation},${metrics.status}`;
  const lineCpuUser = `${timestamp},cpu.user.time,${metrics.startCpuUser},${metrics.endCpuUser},ms,${metrics.operationType},${metrics.operation},${metrics.status}`;
  const lineMem = `${timestamp},memory.rss,${metrics.startMem},${metrics.endMem},MB,${metrics.operationType},${metrics.operation},${metrics.status}`;
  const duration = `${timestamp},duration,${metrics.duration},-,ms,${metrics.operationType},${metrics.operation},${metrics.status}`;

  fs.appendFileSync(METRICS_FILE, `${lineCpuSystem}\n${lineCpuUser}\n${lineMem}\n${duration}\n`);
}