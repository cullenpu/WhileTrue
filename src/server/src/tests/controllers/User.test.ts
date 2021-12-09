import request from 'supertest';
import { Express } from 'express';

import * as gpt3 from '../../lib/gpt3';
import * as prisma from '../../lib/prisma';

import { jwtMiddlewareStub, mockClientSegments, mockOffers } from '../mock';

describe('getUserInfo endpoint', () => {
  const endpoint = '/api/info';
  let jwtMiddleWareStub;
  let app: Express;

  beforeAll(() => {
    jwtMiddleWareStub = jwtMiddlewareStub;

    // eslint-disable-next-line global-require
    app = require('../../app').default;
  });

  test('Status 200', async () => {
    const mockedPrismaGet = jest.spyOn(prisma, 'getAllUserInfo').mockReturnValueOnce(
      Promise.resolve({
        offers: mockOffers,
        clientsegments: mockClientSegments,
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
    const mockedPrismaGet = jest.spyOn(prisma, 'getAllUserInfo').mockRejectedValueOnce(new Error('error'));

    await request(app)
      .get(endpoint)
      .then(async (response) => {
        expect(mockedPrismaGet).toBeCalled();
        expect(response.statusCode).toBe(500);
      });
  });
});
