import request from 'supertest';
import { Request, Response, NextFunction, Express } from 'express';
import sinon from 'sinon';

import * as gpt3 from '../../lib/gpt3';
import * as prisma from '../../lib/prisma';
import * as Auth from '../../controllers/Auth';

import { jwtMiddlewareStub, mockClientSegments, mockContent, mockOffers } from '../mock';

describe('getData endpoint', () => {
  let jwtMiddleWareStub;
  let app: Express;

  beforeAll(() => {
    jwtMiddleWareStub = jwtMiddlewareStub;

    // eslint-disable-next-line global-require
    app = require('../../app').default;
  });

  test('Status 200 get data', async () => {
    const endpoint = '/api/data/offers';
    const mockedPrismaGet = jest.spyOn(prisma, 'getDataForUser').mockReturnValueOnce(
      Promise.resolve({
        mockOffers,
      }),
    );

    await request(app)
      .get(endpoint)
      .then(async (response) => {
        expect(mockedPrismaGet).toBeCalled();
        expect(response.statusCode).toBe(200);
      });
  });

  test('Status 200 get user offers and client segments', async () => {
    const endpoint = '/api/data/offersclientsegments?offerIds=1&clientsegmentIds=1';
    const mockedPrismaGet = jest.spyOn(prisma, 'getUserOffersAndClientSegments').mockReturnValueOnce(
      Promise.resolve({
        offers: mockOffers,
        clientSegments: mockClientSegments,
      }),
    );

    await request(app)
      .get(endpoint)
      .then(async (response) => {
        expect(mockedPrismaGet).toBeCalled();
        expect(response.statusCode).toBe(200);
      });
  });

  test('Status 500', async () => {
    const endpoint = '/api/data/offers';
    const mockedPrismaGet = jest.spyOn(prisma, 'getDataForUser').mockRejectedValueOnce(new Error('error'));

    await request(app)
      .get(endpoint)
      .then(async (response) => {
        expect(mockedPrismaGet).toBeCalled();
        expect(response.statusCode).toBe(500);
      });
  });
});

describe('saveData endpoint', () => {
  let jwtMiddleWareStub;
  let app: Express;

  beforeAll(() => {
    jwtMiddleWareStub = jwtMiddlewareStub;

    // eslint-disable-next-line global-require
    app = require('../../app').default;
  });

  test('Status 200 save content', async () => {
    const endpoint = '/api/data/content';
    const mockedPrismaSaveContent = jest.spyOn(prisma, 'saveContent').mockReturnValueOnce(
      Promise.resolve({
        mockContent,
      }),
    );

    await request(app)
      .post(endpoint)
      .then(async (response) => {
        expect(mockedPrismaSaveContent).toBeCalled();
        expect(response.statusCode).toBe(200);
      });
  });

  test('Status 200 save offer', async () => {
    const endpoint = '/api/data/offers';
    const mockedPrismaSaveDataForUser = jest.spyOn(prisma, 'saveDataForUser').mockReturnValueOnce(
      Promise.resolve({
        mockOffers,
      }),
    );

    await request(app)
      .post(endpoint)
      .then(async (response) => {
        expect(mockedPrismaSaveDataForUser).toBeCalled();
        expect(response.statusCode).toBe(200);
      });
  });

  test('Status 500', async () => {
    const endpoint = '/api/data/offers';
    const mockedPrismaSaveDataForUser = jest.spyOn(prisma, 'saveDataForUser').mockRejectedValueOnce(new Error('error'));

    await request(app)
      .post(endpoint)
      .then(async (response) => {
        expect(mockedPrismaSaveDataForUser).toBeCalled();
        expect(response.statusCode).toBe(500);
      });
  });
});
