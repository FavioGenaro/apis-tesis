import { metricsExporter, metricsInterceptor } from './metrics.type';
import { PubSub } from "@google-cloud/pubsub";

export async function pushMetricExporter( metrics: metricsExporter[]) {
  try {
    const pubsub = new PubSub();
    const topicName = process.env.TOPIC_EXPORTER;

    if(!topicName) return;
    
    const mensaje = {
      type : "metricExporter",
      data: {
        ...metrics
      }
    };

    const dataBuffer = Buffer.from(JSON.stringify(mensaje));

    await pubsub.topic(topicName).publishMessage({ data: dataBuffer });
  } catch (err) {
    console.error('Error publicando métricas del exporter en Pub/Sub:', err.message);
  }
}

export async function pushMetricInterceptor( metrics: metricsInterceptor) {
  try {
    const pubsub = new PubSub();
    const topicName = process.env.TOPIC_INTERCEPTOR;

    if(!topicName) return;

    const mensaje = {
      type : "metricInterceptor",
      data: {
        timestamp: metrics.timestamp,
        startCpuUser: metrics.startCpuUser,
        startCpuSystem: metrics.startCpuSystem,
        startMem: metrics.startMem,
        endCpuUser: metrics.endCpuUser,
        endCpuSystem: metrics.endCpuSystem,
        endMem: metrics.endMem,
        duration: metrics.duration,
        operationType: metrics.operationType,
        operation: metrics.operation,
        status: metrics.status,
      }
    };

    const dataBuffer = Buffer.from(JSON.stringify(mensaje));

    await pubsub.topic(topicName).publishMessage({ data: dataBuffer });
  } catch (err) {
    console.error('Error publicando métricas del interceptor en Pub/Sub:', err.message);
  }
}
