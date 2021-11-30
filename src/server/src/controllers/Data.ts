import { Request, Response } from 'express';
import { logger } from '@sentry/utils';
import { PrismaClient } from '@prisma/client';

import { getDataForUser, saveDataForUser } from '../lib/prisma';

const prisma = new PrismaClient();

const getUserClientSegments = async (req: Request, res: Response) => {
  try {
    const clientSegments = await getDataForUser(prisma.clientSegment, req.user.email);
    res.json(clientSegments);
  } catch (error) {
    logger.log('Error getting client segments', { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: 'Error getting client segments' });
  }
};

const getUserOffers = async (req: Request, res: Response) => {
  try {
    const offers = await getDataForUser(prisma.offer, req.user.email);
    res.json(offers);
  } catch (error) {
    logger.log('Error getting offers', { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: 'Error getting offers' });
  }
};

const saveUserClientSegment = async (req: Request, res: Response) => {
  const { clientSegment } = req.body;
  try {
    const segment = await saveDataForUser(prisma.clientSegment, { segment: clientSegment }, req.user.email);
    res.json(segment);
  } catch (error) {
    logger.log('Error saving offer', { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: 'Error saving offer' });
  }
};

const saveUserOffer = async (req: Request, res: Response) => {
  const { offerType, offerDescription } = req.body;
  try {
    const offer = await saveDataForUser(prisma.offer, { type: offerType, offer: offerDescription }, req.user.email);
    res.json(offer);
  } catch (error) {
    logger.log('Error saving offer', { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: 'Error saving offer' });
  }
};

export { getUserClientSegments, getUserOffers, saveUserClientSegment, saveUserOffer };
