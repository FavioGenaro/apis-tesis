import {
  PushMetricExporter,
  ResourceMetrics,
  AggregationTemporality,
} from '@opentelemetry/sdk-metrics';
import { ExportResult } from '@opentelemetry/core';
import { pushMetricExporter } from './push-metrics';

export class MetricExporter implements PushMetricExporter {

  constructor() {}

  async export(metrics: ResourceMetrics, resultCallback: (result: ExportResult) => void): Promise<void> {
    
    let memory: string = ''
    let cpuUser: string = ''
    let cpuSystem: string = ''

    const allMetrics = metrics.scopeMetrics.flatMap( (scope) =>
      scope.metrics.flatMap((metric) => {
        if (!metric.dataPoints.length) return [];
        
        return metric.dataPoints.map((point) => {
          
          const timestamp = point.endTime[0] * 1000 + Math.floor(point.endTime[1] / 1e6);
          const value = typeof point.value === 'number' ? point.value : point.value.sum;
          const name = metric.descriptor.name;
          const unit = metric.descriptor.unit;

          if(name == 'memory.rss') {
            memory = value
          }

          if(name == 'cpu.system.time') {
            cpuSystem = value
          }

          if(name == 'cpu.user.time') {
            cpuUser = value
          }

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

    await pushMetricExporter({
      timestamp: Date.now().toString(),
      cpuUser: cpuUser.toString(),
      cpuSystem: cpuSystem.toString(),
      mem: memory.toString()
    })

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