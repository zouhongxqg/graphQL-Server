import { Context } from 'koa';

// const toNumber = s => (s ? Number(s) : null);

// const genId = () => String(Date.now() + +String(Math.random()).slice(2));

export interface IContext {
  state: {
    userId: string;
  };
  ua: string;
}

export default (ctx: Context): IContext => {
  const context: IContext = {
    state: {
      userId: ctx.header['user-id'],
    },
    get ua() {
      return ctx.header['user-agent'];
    },
  };

  ctx.state.graphqlContext = context;

  return context;
};
