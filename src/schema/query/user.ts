import { UserType } from '../types/user';
import { User } from '../../models';

export const user: FieldConfig = {
  type: UserType,
  description: '用户信息',
  resolve: (_, __, ctx) => {
    console.log(ctx.state.userId);
    return User.create(ctx.state.userId);
  },
};
