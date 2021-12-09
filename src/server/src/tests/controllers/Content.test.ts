import request from 'supertest';
import { Express } from 'express';

import * as gpt3 from '../../lib/gpt3';
import * as prisma from '../../lib/prisma';

import { jwtMiddlewareStub, mockClientSegments, mockOffers } from '../mock';

describe('generateCopy endpoint', () => {
  const endpoint = '/api/generate-copy';
  let jwtMiddleWareStub;
  let app: Express;

  beforeAll(() => {
    jwtMiddleWareStub = jwtMiddlewareStub;

    // eslint-disable-next-line global-require
    app = require('../../app').default;
  });

  test('Status 200', async () => {
    const mockedPrismaGet = jest.spyOn(prisma, 'getOfferAndClientSegmentForUser').mockReturnValueOnce(
      Promise.resolve({
        offers: mockOffers,
        clientsegments: mockClientSegments,
      }),
    );

    const mockedGpt3Generate = jest.spyOn(gpt3, 'default').mockReturnValueOnce(Promise.resolve(['content']));

    await request(app)
      .post(endpoint)
      .then(async (response) => {
        expect(mockedPrismaGet).toBeCalled();
        expect(mockedGpt3Generate).toBeCalled();
        expect(response.statusCode).toBe(200);
      });
  });

  test('Status 500', async () => {
    const mockedPrismaGet = jest.spyOn(prisma, 'getOfferAndClientSegmentForUser').mockReturnValueOnce(
      Promise.resolve({
        offers: mockOffers,
        clientsegments: mockClientSegments,
      }),
    );

    const mockedGpt3Generate = jest.spyOn(gpt3, 'default').mockRejectedValueOnce(new Error('error'));

    await request(app)
      .post(endpoint)
      .then(async (response) => {
        expect(mockedPrismaGet).toBeCalled();
        expect(mockedGpt3Generate).toBeCalled();
        expect(response.statusCode).toBe(500);
      });
  });
});
