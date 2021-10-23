import express from 'express';
import jwt from 'express-jwt';
import { authLogin, jwtMiddleware } from './controllers/Auth';
import { getUserInfo } from './controllers/User';

const router = express.Router();

router.get('/status', (_, res) => {
  res.json({ status: 'running' });
});

router.post('/login', authLogin);
router.get('/info', jwtMiddleware, getUserInfo);

export default router;
