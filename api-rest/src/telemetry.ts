// import { MeterProvider } from '@opentelemetry/sdk-metrics';
// import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
// import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
// import * as os from 'os';
// import { Resource, resourceFromAttributes } from '@opentelemetry/resources';
// import { ATTR_SERVICE_NAME, SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
// import { NodeSDK } from '@opentelemetry/sdk-node';
// import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
// import { CsvMetricExporter } from './csv-metrics-exporter';

// const metricExporter = new OTLPMetricExporter({
//   url: 'https://otlp.nr-data.net/v1/metrics', // Ejemplo con New Relic
//   headers: {
//     'api-key': process.env.NEW_RELIC_LICENSE_KEY ?? '',
//   },
// });
// // license key - 3809d98540394a7da0141b802fc888e8FFFFNRAL

// const meterProvider = new MeterProvider({
//   readers: [
//     new PeriodicExportingMetricReader({
//       exporter: metricExporter,
//       exportIntervalMillis: 100,
//     }),
//   ],
// });

// const meter = meterProvider.getMeter('api-rest-tesis');


// const meterProvider = new MeterProvider({
//   readers: [
//     new PeriodicExportingMetricReader({
//       exporter: new CsvMetricExporter('metrics.csv'),
//       exportIntervalMillis: 10000,
//     })
//   ]
// });


// // 🧠 Recolección de memoria
// meter.createObservableGauge('process.memory.rss', {
//   description: 'Resident memory used by process in bytes',
// }).addCallback((observableResult) => {
//   observableResult.observe(process.memoryUsage().rss);
// });

// meter.createObservableGauge('process.memory.heap.used', {
//   description: 'Heap memory used by Node.js in bytes',
// }).addCallback((observableResult) => {
//   observableResult.observe(process.memoryUsage().heapUsed);
// });

// // 🧠 CPU (tiempo de uso del proceso en milisegundos)
// meter.createObservableGauge('process.cpu.usage', {
//   description: 'CPU time used by process in milliseconds',
// }).addCallback((observableResult) => {
//   const usage = process.cpuUsage(); // user + system
//   const totalMillis = (usage.user + usage.system) / 1000;
//   observableResult.observe(totalMillis);
// });




// meterProvider.readers(
//   new PeriodicExportingMetricReader({
//     exporter: new CsvMetricExporter('metrics.csv'),
//     exportIntervalMillis: 10000,
//   })
// );

// const sdk = new NodeSDK({
//   resource: resourceFromAttributes({
//     [ATTR_SERVICE_NAME]: 'api-rest-tesis',
//   }),
//   traceExporter: new OTLPTraceExporter({
//     url: 'https://otlp.nr-data.net/v1/traces', // para US. Usa `https://eu.otlp.nr-data.net/v1/traces` si estás en Europa
//     headers: {
//       'api-key': process.env.NEW_RELIC_LICENSE_KEY ?? '',
//     },
//   }),
//   instrumentations: [getNodeAutoInstrumentations()],
// });
// console.log('Telemetry inicializado')
// sdk.start()

// process.on('SIGTERM', () => {
//   sdk.shutdown()
//     .then(() => console.log('Tracing terminated'))
//     .catch((error) => console.log('Error terminating tracing', error))
//     .finally(() => process.exit(0));
// });

import { NodeSDK } from '@opentelemetry/sdk-node';
import { CsvSpanExporter, CsvMetricExporter } from './csv-exporters';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { Resource, resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [SemanticResourceAttributes.SERVICE_NAME]: 'api-rest',
  }),
  traceExporter: new CsvSpanExporter(),
  // metricReader: new PeriodicExportingMetricReader({
  //   exporter: new CsvMetricExporter(),
  //   exportIntervalMillis: 10000,
  // }),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation()
  ],
});

try {
  sdk.start();
  console.log('OpenTelemetry iniciado');
} catch (err) {
  console.error('Error al iniciar OpenTelemetry:', err);
}


import { metrics } from '@opentelemetry/api';
import * as os from 'os';
import * as process from 'process';

const meter = metrics.getMeter('custom');

export const heapUsedHistogram = meter.createHistogram('custom.heap.used', {
  description: 'Heap usado (memoria RAM) en bytes',
});

export const cpuUsedHistogram = meter.createHistogram('custom.cpu.time', {
  description: 'Tiempo de CPU consumido por la petición (milisegundos)',
});

// export const cpuGauge = meter.createObservableGauge('custom.cpu.usage', {
//   description: 'Uso de CPU en %',
// });

// export const memoryGauge = meter.createObservableGauge('custom.memory.rss', {
//   description: 'Memoria RSS en bytes',
// });

// cpuGauge.addCallback((observableResult) => {
//   const cpus = os.cpus();
//   const usage = process.cpuUsage(); // microsegundos
//   const userCPU = usage.user / 1000000; // milisegundos
//   const systemCPU = usage.system / 1000000;

//   observableResult.observe(userCPU + systemCPU);
// });

// memoryGauge.addCallback((observableResult) => {
//   observableResult.observe(process.memoryUsage().rss);
// });





// sdk.start()
  // .then(() => console.log('OpenTelemetry CSV export iniciado'))
  // .catch((err) => console.error('Error al iniciar OpenTelemetry', err));

//   import { trace } from '@opentelemetry/api';

// const tracer = trace.getTracer('custom');

// const span = tracer.startSpan('mi-span-de-prueba');
// setTimeout(() => {
//   span.end(); // Esto genera el span y lo exporta
// }, 300);