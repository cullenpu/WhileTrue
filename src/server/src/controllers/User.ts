import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import logger from '../utils/logger';

const prisma = new PrismaClient();

const getUserInfo = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.user.email },
      include: {
        offers: true,
        clientsegments: true,
        content: true,
      },
    });

    return res.json(user);
  } catch (error) {
    logger.log('Error getting user info: user does not exist', { level: 'error', meta: { error } });
    return res.status(500).json({ message: 'User does not exist' });
  }
};

export { getUserInfo };
