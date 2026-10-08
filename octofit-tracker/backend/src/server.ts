import express from 'express';
import { frontendOrigin } from './config/api';
import { connectDatabase } from './config/database';
import apiRouter from './routes/api';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 11000
  );
}

app.use(express.json());
app.use((request, response, next) => {
  const origin = request.get('origin');
  if (origin && (origin === frontendOrigin || origin === 'http://127.0.0.1:5173')) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }
  next();
});

app.get('/api/health/', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use(apiRouter);

app.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    if (error instanceof SyntaxError && 'body' in error) {
      response.status(400).json({ error: 'Request body contains invalid JSON' });
      return;
    }

    if (error instanceof Error && error.name === 'ValidationError') {
      response.status(400).json({ error: error.message });
      return;
    }

    if (error instanceof Error && error.name === 'CastError') {
      response.status(400).json({ error: 'Invalid value in request' });
      return;
    }

    if (isDuplicateKeyError(error)) {
      response.status(409).json({ error: 'A record with that unique value already exists' });
      return;
    }

    console.error('API request failed:', error);
    response.status(500).json({ error: 'Internal server error' });
  },
);

async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening at ${apiBaseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API:', error);
  process.exitCode = 1;
});