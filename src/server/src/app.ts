import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes';

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(cookieParser());
app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../app/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../app/build/index.html'));
  });
}

export default app;
