import express from 'express';
import { authLogin, jwtMiddleware } from './controllers/Auth';
import generateCopy from './controllers/Content';
import { getData, saveData, searchDataByModel } from './controllers/Data';
import { getUserInfo } from './controllers/User';

const router = express.Router();

router.get('/status', (_, res) => {
  res.json({ status: 'running' });
});

router.post('/login', authLogin);
router.get('/info', jwtMiddleware, getUserInfo);

router.post('/generate-copy', jwtMiddleware, generateCopy);

// Content, Offers and Client Segments

router.get('/data/offersclientsegments', jwtMiddleware, (req, res) => getData(req, res, 'user'));

router.get('/data/content', jwtMiddleware, (req, res) => getData(req, res, 'content'));
router.post('/data/content', jwtMiddleware, (req, res) => saveData(req, res, 'content'));

router.get('/data/clients', jwtMiddleware, (req, res) => getData(req, res, 'clientSegment'));
router.post('/data/clients', jwtMiddleware, (req, res) => saveData(req, res, 'clientSegment'));

router.get('/data/offers', jwtMiddleware, (req, res) => getData(req, res, 'offer'));
router.post('/data/offers', jwtMiddleware, (req, res) => saveData(req, res, 'offer'));

router.get('/data/search/offers?searchTerm=:searchTerm', jwtMiddleware, (req, res) =>
  searchDataByModel(req, res, 'offer'),
);
router.get('/data/clients?searchTerm=:searchTerm', jwtMiddleware, (req, res) =>
  searchDataByModel(req, res, 'clientSegment'),
);

export default router;
