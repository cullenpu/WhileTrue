import { prisma } from '.prisma/client';
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

router.get('/dashboard/content', (req, res) => {
  res.send([
    {
      contentTitle: '3% Cash Back Mastercard',
      contentText:
        'Stock up on your favourite snacks for Sunday night football, enjoy 3% cash back on groceries \n\nonly with your BMO CashBack Mastercard.',
    },
    {
      contentTitle: 'Switch and get the latest iPad',
      contentText:
        'Never worry about lugging heavy textbooks to class again, with a free 2021 iPad when switching to RBC.',
    },
    {
      contentTitle: 'Mock offer',
      contentText: 'Mock text',
    },
  ]);
});

router.get('/Content', (req, res) => {
  res.send([
    {
      contentText: 'OFFER ONE',
    },
    {
      contentText: 'OFFER TWO',
    },
    {
      contentText: 'OFFER THREE',
    },
  ]);

});

router.post('/content', async (req, res) => {
  const { userId, contentTitle, contentText } = req.body;
  const content = await prisma.content.create({
    data: {
      contentTitle,
      contentText,
      user: { connect: { id: userId } },
    }
  })
  
  res.json(content);
})

export default router;
