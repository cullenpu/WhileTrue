import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import logger from '../utils/logger';
import { getAllUserInfo } from '../lib/prisma';

const getUserInfo = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  try {
    const user = await getAllUserInfo(prisma.user, req.user.email);

    return res.json(user);
  } catch (error) {
    logger.log('Error getting user info: user does not exist', { level: 'error', meta: { error } });
    return res.status(500).json({ message: 'User does not exist' });
  }
};

export { getUserInfo };
