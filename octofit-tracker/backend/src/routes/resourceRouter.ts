import { Router, type Request, type Response } from 'express';
import type { Model } from 'mongoose';

export function createResourceRouter<T>(
  model: Model<T>,
  options: { sort?: Record<string, 1 | -1>; populate?: string[] } = {},
): Router {
  const router = Router();

  router.get('/', async (_request: Request, response: Response) => {
    const query = model.find();
    if (options.sort) query.sort(options.sort);
    options.populate?.forEach((path) => query.populate(path));
    response.json(await query.exec());
  });

  router.post('/', async (request: Request, response: Response) => {
    if (
      typeof request.body !== 'object' ||
      request.body === null ||
      Array.isArray(request.body)
    ) {
      response.status(400).json({ error: 'Request body must be a JSON object' });
      return;
    }

    response.status(201).json(await model.create(request.body));
  });

  return router;
}
