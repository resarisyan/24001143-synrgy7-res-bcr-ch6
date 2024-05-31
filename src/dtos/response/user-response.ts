import { UserModel } from '../../models/UserModel.js';

export type UserResponse = {
  id?: string;
  username: string;
  name: string;
  token?: string;
  role?: string;
};

export const toUserResponse = (user: UserModel): UserResponse => {
  return {
    username: user.username,
    name: user.name
  };
};
