
import { NodeSDK } from '@opentelemetry/sdk-node';
import { CsvMetricExporter, CsvSpanExporter } from './csv-exporters';
import { resourceFromAttributes, Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { metrics } from '@opentelemetry/api';
import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';


const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [SemanticResourceAttributes.SERVICE_NAME]: 'api-rest',
  }),
  traceExporter: new CsvSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new CsvMetricExporter(), // o CsvMetricExporter personalizado
    exportIntervalMillis: 5000, // Cada 5 segundos
  }),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation()
  ],
});


// meterProvider.addMetricReader(
//   new PeriodicExportingMetricReader({
//     exporter: new ConsoleMetricExporter(), // o CsvMetricExporter personalizado
//     exportIntervalMillis: 5000, // Cada 5 segundos
//   }),
// );

try {
  sdk.start();
  console.log('OpenTelemetry iniciado');
} catch (err) {
  console.error('Error al iniciar OpenTelemetry:', err);
}

// const meterProvider = new MeterProvider({
//   resource: resourceFromAttributes({
//     [SemanticResourceAttributes.SERVICE_NAME]: 'my-api-loadtest',
//   }),

//   readers: [
//     new PeriodicExportingMetricReader({
//       exporter: new CsvMetricExporter(), // o CsvMetricExporter personalizado
//       exportIntervalMillis: 5000, // Cada 5 segundos
//     }),
//   ]
// });

// metrics.setGlobalMeterProvider(meterProvider);

const meter = metrics.getMeter('custom');

meter.createObservableGauge('memory_rss_mb', {
  description: 'Resident Set Size (RSS) Memory in MB',
}).addCallback(result => {
  const rss = process.memoryUsage().rss / 1024 / 1024;
  result.observe(rss);
});

meter.createObservableGauge('cpu_system_ms', {
  description: 'CPU system time (ms)',
}).addCallback(result => {
  const usage = process.cpuUsage();
  result.observe(usage.system / 1000);
});

