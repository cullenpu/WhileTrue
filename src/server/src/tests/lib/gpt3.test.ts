import request from 'supertest';
import { Request, Response, NextFunction, Express } from 'express';
import OpenAI from 'openai-api';

import * as gpt3 from '../../lib/gpt3';

import { jwtMiddlewareStub, mockClientSegments, mockContent, mockOffers } from '../mock';

describe('GPT3 API tests', () => {
  test('generateCopyUsingGPT3', async () => {
    const endpoint = '/api/data/offersclientsegments?offerIds=1&clientsegmentIds=1';
    const mockedPrismaGet = jest.spyOn(OpenAI.prototype, 'complete').mockReturnValueOnce(
      Promise.resolve({
        data: {
          id: 'test',
          object: 'test',
          model: 'test',
          created: 0,
          choices: [{ text: '\n\ntest', index: 0, logprobs: 0, finish_reason: 'test' }],
        },
      }),
    );

    const copy = await gpt3.default({
      description: 'test',
      type: 'test',
      seed: 'test',
      audience: 'test',
    });

    expect(copy).toStrictEqual(['test']);
  });
});
