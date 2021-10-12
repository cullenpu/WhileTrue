import express from 'express';
import path from 'path';
import cors from 'cors';

require('dotenv').config();

const { Magic } = require('@magic-sdk/admin');

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const app = express();
const port = 8080;

app.use(cors({ origin: process.env.CLIENT_URL }));

app.get('/api/status', (_, res) => {
  res.json({ status: 'running' });
});

app.post('/api/login', async (req, res) => {
  try {
    if (req.headers.authorization) {
      const didToken = req.headers.authorization.substr(7);
      await magic.token.validate(didToken);
      res.status(200).json({ authenticated: true });
    } else {
      throw Error('no auth');
    }
  } catch (error) {
    let errorMessage = 'Auth error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({ error: errorMessage });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../app/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../app/build/index.html'));
  });
}

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
