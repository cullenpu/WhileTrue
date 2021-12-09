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
    } else {
      data = await getDataForUser(prismaModels[modelToAccess], req.user.email);
    }
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
    console.log(error);
    logger.log(`Error saving ${modelToAccess}`, { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: `Error saving ${modelToAccess}` });
  }
};

const searchDataByModel = async (req: Request, res: Response, modelToAccess: string) => {
  try {
    console.log('yo22');
    const { searchTerm } = req.params;
    console.log('yo');
    console.log(searchTerm);
    const searchResults = await searchData(prismaModels[modelToAccess], searchTerm);
    console.log(searchResults);
    res.json(searchResults);
  } catch (error) {
    console.log(error);
    logger.log(`Error searching ${modelToAccess}`, { level: 'error', meta: { user: req.user.email, error } });
    res.status(500).json({ message: `Error searching ${modelToAccess}` });
  }
};

export { prismaModels, getData, saveData, searchDataByModel };
