import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

dotenv.config();

const app = express();

Sentry.init({
  dsn: 'https://40099415ec794dc699bb48d013e6792a@o358880.ingest.sentry.io/5954474',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../app/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../app/build/index.html'));
  });
}

app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!');
});

// This must be AFTER all controllers!
app.use(Sentry.Handlers.errorHandler());

export default app;
