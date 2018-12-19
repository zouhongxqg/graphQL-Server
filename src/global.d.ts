import { GraphQLFieldConfig, GraphQLInputFieldConfig } from 'graphql';

import { IContext } from './context';

declare global {
  export type FieldConfigMap<T, K extends string = keyof T> = {
    [key in keyof T | K]: GraphQLFieldConfig<T, IContext>
  };

  export type InputFieldConfigMap<T> = {
    [key in keyof T]: GraphQLInputFieldConfig
  };

  export type FieldConfig<T = any> = GraphQLFieldConfig<T, IContext>;

  export interface InputArgs<T> {
    input: T;
  }
}

export {};
