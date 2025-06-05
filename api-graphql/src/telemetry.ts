
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


// import { metrics } from '@opentelemetry/api';

// const meter = metrics.getMeter('custom');

// export const heapUsedHistogram = meter.createHistogram('heap.used', {
//   description: 'Heap usado (memoria RAM) en bytes',
// });

// export const cpuUsedHistogram = meter.createHistogram('cpu.time', {
//   description: 'Tiempo de CPU consumido por la petición (milisegundos)',
// });
