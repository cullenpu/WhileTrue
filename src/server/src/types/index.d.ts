type User = {
  issuer: string;
  email: string;
  lastLogin: Number;
};

declare namespace Express {
  export interface Request {
    user: User;
  }
}
