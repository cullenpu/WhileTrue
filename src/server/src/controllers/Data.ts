import { PrismaClient } from '@prisma/client';
import { logger } from '@sentry/utils';
import { Request, Response } from 'express';
import {
  getDataForUser,
  getUserOffersAndClientSegments,
  PrismaModel,
  saveContent,
  saveDataForUser,
  searchData,
} from '../lib/prisma';

const prisma = new PrismaClient();

const prismaModels: { [key: string]: PrismaModel } = {
  user: prisma.user,
  clientSegment: prisma.clientSegment,
  offer: prisma.offer,
  content: prisma.content,
};

const makeNumberArray = (value: any) => {
  return value.split(',').map((item: string) => parseInt(item, 10));
};

const getOffersAndClientSegmentMap = (data: any) => {
  const offers = {};
  for (let i = 0; i < data.offers.length; i += 1) {
    // @ts-expect-error
    offers[data.offers[i].id] = data.offers[i];
  }

  const clientSegments = {};
  for (let i = 0; i < data.clientsegments.length; i += 1) {
    // @ts-expect-error
    clientSegments[data.clientsegments[i].id] = data.clientsegments[i];
  }
  return { offers, clientSegments };
};

const getData = async (req: Request, res: Response, modelToAccess: string) => {
  try {
    let data;
    if (req.query.offerIds && req.query.clientsegmentIds) {
      const offerIds = makeNumberArray(req.query.offerIds);
      const clientsegmentIds = makeNumberArray(req.query.clientsegmentIds);
      data = await getUserOffersAndClientSegments(
        prismaModels[modelToAccess],
        offerIds,
        clientsegmentIds,
        req.user.email,
      );

      return res.json(getOffersAndClientSegmentMap(data));
    }
    data = await getDataForUser(prismaModels[modelToAccess], req.user.email);

    res.json(data);
  } catch (error) {
    logger.log(`Error getting ${modelToAccess}`, { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: `Error getting ${modelToAccess}` });
  }
};

const saveData = async (req: Request, res: Response, modelToAccess: string) => {
  try {
    let data;
    if (modelToAccess === 'content') {
      data = await saveContent(prismaModels[modelToAccess], req.body, req.user.email);
    } else {
      data = await saveDataForUser(prismaModels[modelToAccess], req.body, req.user.email);
    }
    res.json(data);
  } catch (error) {
    logger.log(`Error saving ${modelToAccess}`, { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: `Error saving ${modelToAccess}` });
  }
};

const searchDataByModel = async (req: Request, res: Response, modelToAccess: string) => {
  try {
    const { searchTerm } = req.params;
    const searchResults = await searchData(prismaModels[modelToAccess], searchTerm);
    res.json(searchResults);
  } catch (error) {
    logger.log(`Error searching ${modelToAccess}`, { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: `Error searching ${modelToAccess}` });
  }
};

export { prismaModels, getData, saveData, searchDataByModel };
