// src/graphql-tracing.plugin.ts
import { PluginDefinition } from 'apollo-server-core';
import { trace, context } from '@opentelemetry/api';
import { ApolloServerPlugin } from '@apollo/server';

export const graphqlTracingPlugin = (): ApolloServerPlugin => ({
  async requestDidStart(requestContext) {
    const span = trace.getSpan(context.active());
    const request = requestContext.request;

    if (span) {

      if (request.operationName !== 'IntrospectionQuery') {
        span.setAttribute('graphql.operation.name', request.operationName || 'Unnamed');
        span.setAttribute('graphql.query', request.query || '');
        span.setAttribute('graphql.operation.type', request.query !== undefined ? request.query.split(' ')[0] : '');
        span.setAttribute('graphql.variables', JSON.stringify(request.variables || {}));
      }
      

      // Extraer tipo de operación desde la AST si es necesario
      // try {
      //   const parsedQuery = requestContext.document?.definitions?.[0];
      //   console.log(requestContext.request)
      //   if (parsedQuery && 'operation' in parsedQuery) {
      //     span.setAttribute('graphql.operation.type', parsedQuery.operation);
      //   }
      // } catch (err) {
      //   span.setAttribute('graphql.operation.type', 'unknown');
      // }
    }

    // Devuelve una promesa que resuelve en void o un listener
    return Promise.resolve();
  },
});
