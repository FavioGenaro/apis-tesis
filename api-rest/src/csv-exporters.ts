import * as fs from 'fs';
import * as path from 'path';
import { ReadableSpan, SpanExporter } from '@opentelemetry/sdk-trace-base';
import {
  PushMetricExporter,
  ResourceMetrics,
  AggregationTemporality,
} from '@opentelemetry/sdk-metrics';
import { ExportResult } from '@opentelemetry/core';

export class CsvSpanExporter implements SpanExporter {
  private filePath = path.join(process.cwd(), 'traces.csv');

  constructor() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, 'timestamp,traceId,spanId,name,duration_ms\n');
    }
  }

  export(spans: ReadableSpan[], resultCallback: any): void {
    for (const span of spans) {
      const line = `${Date.now()},${span.spanContext().traceId},${span.spanContext().spanId},${span.name},${span.duration[0] * 1000 + span.duration[1] / 1e6}\n`;
      fs.appendFileSync(this.filePath, line);
    }
    resultCallback({ code: 0 });
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }
}

export class CsvMetricExporter implements PushMetricExporter {
  private filePath = path.join(process.cwd(), 'metrics.csv');

  constructor() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, 'timestamp,metric,value,unit\n');
    }
  }

  export(metrics: ResourceMetrics, resultCallback: (result: ExportResult) => void): void {

    const allMetrics = metrics.scopeMetrics.flatMap((scope) =>
      scope.metrics.flatMap((metric) => {
        if (!metric.dataPoints.length) return [];
        return metric.dataPoints.map((point) => {
          const timestamp = point.endTime[0] * 1000 + Math.floor(point.endTime[1] / 1e6);
          const value = typeof point.value === 'number' ? point.value : point.value.sum;
          const name = metric.descriptor.name;
          const unit = metric.descriptor.unit;
          const attributes = JSON.stringify(point.attributes || {});
          return `${timestamp},${name},${value},${unit},${attributes}`;
        });
      })
    );

    if (allMetrics.length === 0) {
      return resultCallback({ code: 0 }); 
    }

    require('fs').appendFileSync(
      'metrics.csv',
      allMetrics.join('\n') + '\n',
    );

    resultCallback({ code: 0 });
  }

  forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }

  getPreferredAggregationTemporality(): AggregationTemporality {
    return AggregationTemporality.CUMULATIVE;
  }
}

const METRICS_FILE = path.resolve(__dirname, '../metrics.csv');

export function writeMetricsToCsv(cpuMs: number, memoryBytes: number, route: string) {
  const timestamp = Date.now();
  const lineCpu = `${timestamp},custom.cpu.time,${cpuMs},ms,${route}`;
  const lineMem = `${timestamp},custom.heap.used,${memoryBytes},bytes,${route}`;

  fs.appendFileSync(METRICS_FILE, `${lineCpu}\n${lineMem}\n`);
}