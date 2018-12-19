import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLScalarType,
  Kind,
} from 'graphql';

import { User } from '../../models';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: (): FieldConfigMap<User> => ({
    nickName: {
      type: GraphQLString,
      description: '用户昵称',
    },
    age: {
      type: GraphQLInt,
      description: '用户昵称',
    },
  }),
});

export interface IUpdateUserInput {
  name: string;
  age: number;
}

export interface IUpdateUserArgs {
  input: IUpdateUserInput;
}

export const UpdateUserInputType = new GraphQLInputObjectType({
  name: 'UpdateUserInput',
  fields: (): InputFieldConfigMap<IUpdateUserInput> => ({
    name: {
      type: GraphQLString,
      description: '用户姓名',
    },
    age: {
      type: GraphQLInt,
      description: '用户性别',
    },
  }),
});

export const UpdateUserPayloadType = new GraphQLScalarType({
  name: 'UpdateUserPayload',
  description: '布尔值，更新用户信息是否成功',
  serialize: Boolean,
  parseValue: Boolean,
  parseLiteral: ast => (ast.kind === Kind.BOOLEAN ? ast.value : null),
});
