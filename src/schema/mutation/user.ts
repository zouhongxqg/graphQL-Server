import { GraphQLNonNull } from 'graphql';

import {
  IUpdateUserArgs,
  UpdateUserInputType,
  UpdateUserPayloadType,
} from '../types/user';

import { userobj } from '../../models/user';

export const updateUser: FieldConfig = {
  type: UpdateUserPayloadType,
  args: {
    input: {
      type: new GraphQLNonNull(UpdateUserInputType),
      description: 'UpdateUserInputType',
    },
  },
  description: '更新用户信息',
  resolve: (_, args: IUpdateUserArgs, ctx) => {
    userobj[ctx.state.userId] = args;
    return true;
  },
};
