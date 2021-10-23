import { serialize } from 'cookie';
import { Response } from 'express';

const TOKEN_NAME = 'token';
const MAX_AGE = 60 * 60 * 24 * 7;

const setTokenCookie = (res: Response, token: string) => {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
  });
  res.setHeader('Set-Cookie', cookie);
};

const removeTokenCookie = (res: Response) => {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
};

export { setTokenCookie, removeTokenCookie };
