import { Request, Response } from 'express';
import { logger } from '@sentry/utils';
import { PrismaClient } from '@prisma/client';

import { getDataForUser, saveDataForUser, PrismaModel } from '../lib/prisma';

const prisma = new PrismaClient();

const prismaModels: { [key: string]: PrismaModel } = {
  clientSegment: prisma.clientSegment,
  offer: prisma.offer,
  content: prisma.content,
};

const getData = async (req: Request, res: Response, modelToAccess: string) => {
  try {
    const data = await getDataForUser(prismaModels[modelToAccess], req.user.email);
    res.json(data);
  } catch (error) {
    logger.log(`Error getting ${modelToAccess}`, { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: `Error getting ${modelToAccess}` });
  }
};

const saveData = async (req: Request, res: Response, modelToAccess: string) => {
  try {
    const data = await saveDataForUser(prismaModels[modelToAccess], req.body, req.user.email);
    res.json(data);
  } catch (error) {
    logger.log(`Error saving ${modelToAccess}`, { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: `Error saving ${modelToAccess}` });
  }
};

export { prismaModels, getData, saveData };
