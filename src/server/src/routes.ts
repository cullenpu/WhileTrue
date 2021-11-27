import express from 'express';
import { authLogin, jwtMiddleware } from './controllers/Auth';
import { getUserContent, saveUserContent } from './controllers/Content';
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

export default router;
