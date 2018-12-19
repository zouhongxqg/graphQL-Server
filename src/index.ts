import 'source-map-support/register';
import * as http from 'http';
import * as Koa from 'koa';
import * as compress from 'koa-compress';
import * as bodyParser from 'koa-bodyparser';
import { IRouterContext } from 'koa-router';

import schema from './schema';
import context from './context';
// import router from './restfulServer/routes';
import graphql from './middleware/graphql';

export interface IRestContext extends IRouterContext {
  state: {
    userId: string;
  };
  ua: string;
}

const app = new Koa();
const isProd = process.env.APP_ENV === 'prod';

app.use(compress());
app.use(bodyParser());

// app.use(router.routes());

app.use(
  graphql({
    schema,
    graphiql: !isProd,
    context,
  }),
);

app.use(ctx => {
  ctx.body = 'GraphQL Endpoint';
});

const server = http.createServer(app.callback());

server.listen(process.env.APP_PORT, () => {
  // tslint:disable:no-console
  console.log();
  console.log(`http://localhost:${process.env.APP_PORT}/graphql`);
  console.log();
});
