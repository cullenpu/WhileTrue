import sinon from 'sinon';

import * as Auth from '../controllers/Auth';

const mockOffers = [
  {
    id: 1,
    userId: 'test',
    type: 'Bank Account',
    offer: 'test',
  },
];

const mockClientSegments = [
  {
    id: 1,
    userId: 'test',
    segment: 'test',
  },
];

const mockContent = [
  {
    contentBody: 'content',
    clientSegmentId: 15,
    offerId: 31,
    seed: 'content',
  },
];

const jwtMiddlewareStub = sinon.stub(Auth, 'jwtMiddleware').callsFake((req, res, next) => {
  req.user = { issuer: '', email: '', lastLogin: 0 };
  next();
  return undefined;
});

export { jwtMiddlewareStub, mockClientSegments, mockContent, mockOffers };
