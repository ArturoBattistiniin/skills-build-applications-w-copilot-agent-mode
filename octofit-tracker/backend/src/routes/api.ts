import { Router, type Request, type Response } from 'express';
import type { Model } from 'mongoose';
import { apiBaseUrl } from '../config/api';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const apiRouter = Router();

apiRouter.get('/', (_request, response) => {
  response.json({
    apiUrl: apiBaseUrl,
    resources: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
  });
});

function collectionRouter<T>(
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

    const document = await model.create(request.body);
    response.status(201).json(document);
  });

  return router;
}

apiRouter.use('/users', collectionRouter(User));
apiRouter.use('/teams', collectionRouter(Team, { populate: ['members'] }));
apiRouter.use('/activities', collectionRouter(Activity, { populate: ['user'] }));
apiRouter.use(
  '/leaderboard',
  collectionRouter(Leaderboard, { sort: { points: -1 }, populate: ['user', 'team'] }),
);
apiRouter.use('/workouts', collectionRouter(Workout));

export default apiRouter;
