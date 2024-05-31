import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { EnumRoleUser } from '../../enums/role-user-enum.js';
import { UserResponse } from '../response/user-response.js';

export type LoginUserRequest = {
  username: string;
  password: string;
};

export interface UserRequest extends Request {
  user?: UserResponse;
  token?: string | JwtPayload;
  role?: EnumRoleUser;
}

export type RegisterUserRequest = {
  name: string;
  username: string;
  password: string;
  role?: EnumRoleUser;
};

export type UpdateUserRequest = {
  name?: string;
  username?: string;
  password?: string;
};
