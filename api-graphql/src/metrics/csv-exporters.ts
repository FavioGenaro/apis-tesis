import * as fs from 'fs';
import * as path from 'path';
import {
  PushMetricExporter,
  ResourceMetrics,
  AggregationTemporality,
} from '@opentelemetry/sdk-metrics';
import { ExportResult } from '@opentelemetry/core';
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

          return `${timestamp},${name},${value},${unit}`;
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