import { PrismaClient } from '@prisma/client';
import { logger } from '@sentry/utils';
import { Request, Response } from 'express';
import generateCopyUsingGPT3 from '../lib/gpt3';
import { getOfferAndClientSegmentForUser } from '../lib/prisma';

const generateCopy = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  try {
    const { clientSegmentId, offerId, seed } = req.body;
    const { offers, clientsegments } = await getOfferAndClientSegmentForUser(
      prisma.user,
      clientSegmentId,
      offerId,
      req.user.email,
    );

    const data = await generateCopyUsingGPT3({
      description: offers[0].offer,
      type: offers[0].type,
      audience: clientsegments[0].segment,
      seed,
    });

    const copies = [];
    for (let i = 0; i < data.length; i += 1) {
      copies.push({ contentBody: data[i], clientSegmentId, offerId, seed });
    }

    res.json(copies);
  } catch (error) {
    console.log(error);
    logger.log('Error saving content', { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: 'Error saving content' });
  }
};

export default generateCopy;
