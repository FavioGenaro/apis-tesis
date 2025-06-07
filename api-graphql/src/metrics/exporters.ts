import {
  PushMetricExporter,
  ResourceMetrics,
  AggregationTemporality,
} from '@opentelemetry/sdk-metrics';
import { ExportResult } from '@opentelemetry/core';
import { metricsExporter } from './metrics.type';
import { pushMetricExporter } from './push-metrics';
export class MetricExporter implements PushMetricExporter {

  constructor() {}

  async export(metrics: ResourceMetrics, resultCallback: (result: ExportResult) => void): Promise<void> {
    
    const allMetrics: metricsExporter[] = metrics.scopeMetrics.flatMap((scope) =>
      scope.metrics.flatMap((metric) => {
        if (!metric.dataPoints.length) return [];
        
        return metric.dataPoints.map((point) => {
          
          const timestamp = point.endTime[0] * 1000 + Math.floor(point.endTime[1] / 1e6);
          const value = typeof point.value === 'number' ? point.value : point.value.sum;
          const name = metric.descriptor.name;
          const unit = metric.descriptor.unit;

          return {
            timestamp: timestamp.toString(),
            name,
            value,
            unit,
          }
        });
      })
    );

    if (allMetrics.length === 0) {
      return resultCallback({ code: 0 }); 
    }

    await pushMetricExporter(allMetrics);

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