import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserRequest } from '~/types';

const prisma = new PrismaClient();

const getUserInfo = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = await prisma.user.findUnique({ where: { id: req.user.issuer } });
    return res.json({ issuer: user?.id, email: user?.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'no user' });
  }
};

export { getUserInfo };
