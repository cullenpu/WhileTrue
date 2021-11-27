import { Request, Response } from 'express';
import { logger } from '@sentry/utils';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUserClientSegments = async (req: Request, res: Response) => {
  try {
    const clientSegments = await prisma.clientSegment.findMany({
      where: {
        user: {
          email: req.user.email,
        },
      },
    });

    res.json(clientSegments);
  } catch (error) {
    logger.log('Error getting client segments', { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: 'Error getting client segments' });
  }
};

const getUserOffers = async (req: Request, res: Response) => {
  try {
    const offers = await prisma.offer.findMany({
      where: {
        user: {
          email: req.user.email,
        },
      },
    });

    res.json(offers);
  } catch (error) {
    logger.log('Error getting offers', { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: 'Error getting offers' });
  }
};

const saveUserClientSegment = async (req: Request, res: Response) => {
  const { offerType, offerDescription } = req.body;
  try {
    const offer = await prisma.offer.create({
      data: {
        type: offerType,
        offer: offerDescription,
        user: { connect: { email: req.user.email } },
      },
    });
    res.json(offer);
  } catch (error) {
    logger.log('Error saving offer', { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: 'Error saving offer' });
  }
};

const saveUserOffer = async (req: Request, res: Response) => {
  const { offerType, offerDescription } = req.body;
  try {
    const offer = await prisma.offer.create({
      data: {
        type: offerType,
        offer: offerDescription,
        user: { connect: { email: req.user.email } },
      },
    });

    res.json(offer);
  } catch (error) {
    logger.log('Error saving offer', { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: 'Error saving offer' });
  }
};

export { getUserClientSegments, getUserOffers, saveUserClientSegment, saveUserOffer };
