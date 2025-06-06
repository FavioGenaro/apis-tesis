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
    }

    return Promise.resolve();
  },
});
