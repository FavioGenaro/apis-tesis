import { PushMetricExporter } from '@opentelemetry/sdk-metrics';
import { AggregationTemporality, ResourceMetrics } from '@opentelemetry/sdk-metrics';
import fs from 'fs';
import path from 'path';

export class CsvMetricExporter implements PushMetricExporter {
  private filePath: string;

  constructor(filename: string = 'metrics.csv') {
    this.filePath = path.join(process.cwd(), filename);
    fs.writeFileSync(this.filePath, 'timestamp,metric,value,unit\n');
  }

  export(metrics: ResourceMetrics, resultCallback: (result: any) => void): void {
    const timestamp = Date.now();
    for (const scopeMetric of metrics.scopeMetrics) {
      for (const metric of scopeMetric.metrics) {
        for (const dp of (metric.dataPoints ?? [])) {
          const value = 'value' in dp ? dp.value : '';
          const line = `${timestamp},${metric.descriptor.name},${value},${metric.descriptor.unit ?? ''}\n`;
          fs.appendFileSync(this.filePath, line);
        }
      }
    }
    resultCallback({ code: 0 }); // success
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
