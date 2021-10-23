import { Request } from 'express';

export type User = {
  issuer: string;
  email: string;
  lastLogin: Number;
};

export interface UserRequest extends Request {
  user: User;
}
