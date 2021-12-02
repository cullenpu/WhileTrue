import { PrismaClient } from '@prisma/client';
import { logger } from '@sentry/utils';
import { Request, Response } from 'express';
import generateCopyUsingGPT3 from '../lib/gpt3';
import { getOfferAndClientSegmentForUser } from '../lib/prisma';

const prisma = new PrismaClient();

const generateCopy = async (req: Request, res: Response) => {
  try {
    const { clientSegmentId, offerId, seed } = req.body;

    const { offers, clientsegments } = await getOfferAndClientSegmentForUser(
      prisma.user,
      clientSegmentId,
      offerId,
      req.user.email,
    );
    const copy = await generateCopyUsingGPT3({
      description: offers[0].offer,
      type: offers[0].type,
      audience: clientsegments[0].segment,
      seed,
    });

    res.json({ offerId, clientSegmentId, seed, copy });
  } catch (error) {
    console.log(error);
    logger.log('Error saving content', { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: 'Error saving content' });
  }
};

export default generateCopy;
