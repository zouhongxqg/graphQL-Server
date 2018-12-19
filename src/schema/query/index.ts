import { GraphQLObjectType } from 'graphql';

import { user as viewer } from './user';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer,
  }),
});
