import { GraphQLObjectType } from 'graphql';

import { updateUser } from './user';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    updateUser,
  }),
});
