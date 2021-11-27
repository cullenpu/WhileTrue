import { PrismaClient } from '@prisma/client';
import { logger } from '@sentry/utils';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const getUserContent = async (req: Request, res: Response) => {
  try {
    const content = await prisma.content.findMany({
      where: {
        user: {
          email: req.user.email,
        },
      },
    });
    res.json(content);
  } catch (error) {
    logger.log('Error getting content', { level: 'error', meta: { user: req.user.email, error: error } });
    res.status(500).json({ message: 'Error getting content' });
  }
};

const saveUserContent = async (req: Request, res: Response) => {
  const { contentTitle, contentText } = req.body;
  try {
    const content = await prisma.content.create({
      data: {
        contentTitle,
        contentText,
        user: { connect: { email: req.user.email } },
      },
    });
    res.json(content);
  } catch (error) {
    logger.log('Error saving content', { level: 'error', meta: { user: req.user.email, error: error } });
    res.status(500).json({ message: 'Error saving content' });
  }
};

export { getUserContent, saveUserContent };
