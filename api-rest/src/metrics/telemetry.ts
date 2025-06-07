import { CsvMetricExporter, } from './csv-exporters';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { metrics } from '@opentelemetry/api';
import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

const meterProvider = new MeterProvider({
  resource: resourceFromAttributes({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-api-loadtest',
  }),

  readers: [
    new PeriodicExportingMetricReader({
      exporter: new CsvMetricExporter(),
      exportIntervalMillis: 5000,
    }),
  ]
});

metrics.setGlobalMeterProvider(meterProvider);

const meter = metrics.getMeter('custom');

meter.createObservableGauge('memory.rss', {
  description: 'Resident Set Size (RSS) Memory in MB',
  unit: 'MB'
}).addCallback(result => {
  const rss = process.memoryUsage().rss / 1024 / 1024;
  result.observe(rss);
});

meter.createObservableGauge('cpu.system.time', {
  description: 'CPU system time (ms)',
  unit: 'ms',
}).addCallback(result => {
  const usage = process.cpuUsage();
  result.observe(usage.system / 1000);
});

meter.createObservableGauge('cpu.user.time', {
  description: 'CPU user time (ms)',
  unit: 'ms',
}).addCallback(result => {
  const usage = process.cpuUsage();
  result.observe(usage.user / 1000);
});

