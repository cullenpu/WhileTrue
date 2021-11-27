import { Magic } from '@magic-sdk/admin';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { uuid } from 'uuidv4';
import { setTokenCookie } from '../lib/cookies';
import logger from '../utils/logger';

dotenv.config();

const magic = new Magic(process.env.MAGIC_SECRET_KEY);
const prisma = new PrismaClient();

const authLogin = async (req: Request, res: Response) => {
  try {
    if (req.headers.authorization) {
      const didToken = req.headers.authorization.substr(7);

      let metadata;
      if (process.env.NODE_ENV === 'production') {
        await magic.token.validate(didToken);

        metadata = await magic.users.getMetadataByToken(didToken);
      } else {
        metadata = { issuer: uuid(), email: req.body.email, publicAddress: '' };
      }
      if (metadata.issuer && metadata.email) {
        const user = await prisma.user.findUnique({ where: { email: metadata.email } });

        if (!user) {
          await prisma.user.create({
            data: {
              id: metadata.issuer,
              email: metadata.email,
            },
          });
        }
      } else {
        const message = 'Could not get metadata from auth token';
        logger.log(message, { level: 'error', meta: { user: req.user.email } });
        throw Error(message);
      }

      const token = jwt.sign(
        { ...metadata, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 },
        process.env.JWT_SECRET || '',
      );

      setTokenCookie(res, token);

      logger.log('User logged in!', { level: 'info', meta: { email: metadata.email } });

      res.status(200).json({ authenticated: true });
    } else {
      const message = 'No authorization header';
      logger.log(message, { level: 'error' });
      throw Error(message);
    }
  } catch (error) {
    let errorMessage = 'Auth error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    logger.log('Error while authenticating', { level: 'error', meta: { error: errorMessage } });
    res.status(500).json({ error: errorMessage });
  }
};

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

export { authLogin, jwtMiddleware };
