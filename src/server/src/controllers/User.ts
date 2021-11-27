import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import logger from '../utils/logger';

const prisma = new PrismaClient();

const getUserInfo = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: req.user.email } });

    return res.json({ issuer: user?.id, email: user?.email });
  } catch (error) {
    logger.log('Error getting user info: user does not exist', { level: 'error', meta: { error: error } });
    return res.status(500).json({ message: 'User does not exist' });
  }
};

export { getUserInfo };
