import { URL } from 'url';
import { Context } from 'koa';

import { execute, GraphQLSchema, parse, Source } from 'graphql';

import { renderGraphiQL } from './renderGraphiQL';

export interface Option {
  schema: GraphQLSchema;
  rootValue?: object;
  graphiql?: boolean;
  path?: string;
  context?: (ctx: Context) => any;
}

export default (options: Option) => async (
  ctx: Context,
  next: () => Promise<any>
) => {
  const { schema, rootValue, graphiql } = options;
  const url = new URL(ctx.request.href);
  if (
    new URL(options.path || '/graphql', url.origin).pathname === url.pathname
  ) {
    if (ctx.request.method === 'POST') {
      const { query, variables, operationName } = ctx.request.body;
      const context = options.context ? options.context(ctx) : ctx;
      const source = new Source(query, 'GraphQL request');
      ctx.body = await execute(
        schema,
        parse(source),
        rootValue,
        context,
        variables,
        operationName
      );
    } else if (graphiql) {
      const { query, variables, operationName } = ctx.request.query;
      if (!query) {
        ctx.body = renderGraphiQL({});
        return;
      }
      const context = options.context ? options.context(ctx) : ctx;
      const source = new Source(query, 'GraphQL request');
      const data = await execute(
        schema,
        parse(source),
        rootValue,
        context,
        variables,
        operationName
      );
      ctx.body = renderGraphiQL({
        query,
        variables,
        operationName,
        result: data
      });
    } else {
      await next();
    }
  } else {
    await next();
  }
};
