import express from 'express';
import { authLogin, jwtMiddleware } from './controllers/Auth';
import { getUserContent, saveUserContent } from './controllers/Content';
import { getUserClientSegments, getUserOffers, saveUserClientSegment, saveUserOffer } from './controllers/Data';
import { getUserInfo } from './controllers/User';

const router = express.Router();

router.get('/status', (_, res) => {
  res.json({ status: 'running' });
});

router.post('/login', authLogin);
router.get('/info', jwtMiddleware, getUserInfo);

// Content
router.get('/content', jwtMiddleware, getUserContent);
router.post('/content', jwtMiddleware, saveUserContent);

// Offers and Client Segments
router.get('/data/clients', jwtMiddleware, getUserClientSegments);
router.get('/data/offers', jwtMiddleware, getUserOffers);
router.post('/data/clients', jwtMiddleware, saveUserClientSegment);
router.post('/data/offers', jwtMiddleware, saveUserOffer);

export default router;
