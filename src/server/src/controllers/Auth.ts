import { Magic, MagicUserMetadata } from '@magic-sdk/admin';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { uuid } from 'uuidv4';

import { findOrCreateUser } from '../lib/prisma';
import { setTokenCookie } from '../lib/cookies';
import logger from '../utils/logger';

dotenv.config();

const magic = new Magic(process.env.MAGIC_SECRET_KEY);
const prisma = new PrismaClient();

const getMetadataFromDidToken = async (didToken: string, email: string) => {
  let metadata;
  if (process.env.NODE_ENV === 'production') {
    await magic.token.validate(didToken);

    metadata = await magic.users.getMetadataByToken(didToken);
  } else {
    metadata = { issuer: uuid(), email, publicAddress: '' };
  }

  return metadata;
};

const signJwtToken = (metadata: MagicUserMetadata) => {
  return jwt.sign({ ...metadata, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 }, process.env.JWT_SECRET || '');
};

const authLogin = async (req: Request, res: Response) => {
  try {
    if (!req.headers.authorization) {
      throw Error('No authorization header');
    }
    const didToken = req.headers.authorization.substr(7);

    const metadata = await getMetadataFromDidToken(didToken, req.body.email);
    if (!metadata.issuer || !metadata.email) {
      const message = 'Could not get metadata from auth token';
      throw Error(message);
    }

    await findOrCreateUser(prisma.user, metadata.issuer, metadata.email);
    setTokenCookie(res, signJwtToken(metadata));
    logger.log('User logged in!', { level: 'info', meta: { email: metadata.email } });

    res.status(200).json({ authenticated: true });
  } catch (error) {
    // @ts-expect-error
    const errorMessage = error.message;
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
