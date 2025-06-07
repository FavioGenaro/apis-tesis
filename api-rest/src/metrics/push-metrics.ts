import * as path from 'path';
import * as fs from 'fs';
import { metricsExporter, metricsInterceptor } from './metrics.type';

const METRICS_INTERCEPTOR_FILE = path.resolve(__dirname, '../../metrics_interceptor.csv');
const METRICS_EXPORTER_FILE = path.resolve(__dirname, '../../metrics_exporter.csv');

export function writeMetricsToCsvInterceptor(metrics: metricsInterceptor) {

  const filePath = path.join(process.cwd(), '../../metrics_interceptor.csv');

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, 'timestamp,metric,startValue,endValue,unit,operationType,operation,status\n');
  }

  const lineCpuSystem = `${metrics.timestamp},cpu.system.time,${metrics.startCpuSystem},${metrics.endCpuSystem},ms,${metrics.operationType},${metrics.operation},${metrics.status}`;
  const lineCpuUser = `${metrics.timestamp},cpu.user.time,${metrics.startCpuUser},${metrics.endCpuUser},ms,${metrics.operationType},${metrics.operation},${metrics.status}`;
  const lineMem = `${metrics.timestamp},memory.rss,${metrics.startMem},${metrics.endMem},MB,${metrics.operationType},${metrics.operation},${metrics.status}`;
  const duration = `${metrics.timestamp},duration,${metrics.duration},-,ms,${metrics.operationType},${metrics.operation},${metrics.status}`;

  fs.appendFileSync(METRICS_INTERCEPTOR_FILE, `${lineCpuSystem}\n${lineCpuUser}\n${lineMem}\n${duration}\n`);
}

export function writeMetricsToCsvExporter(metrics: metricsExporter[]) {

  const filePath = path.join(process.cwd(), '../../metrics_exporter.csv');

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, 'timestamp,metric,value,unit\n');
  }

  const lines = metrics.map((metric) => (
    `${metric.timestamp},${metric.name},${metric.value},${metric.unit}`
  )).join('\n')

  fs.appendFileSync(METRICS_EXPORTER_FILE, `${lines}\n`);
}