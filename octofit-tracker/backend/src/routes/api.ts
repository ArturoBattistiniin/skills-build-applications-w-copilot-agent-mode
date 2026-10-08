import { Router } from 'express';
import { apiBaseUrl } from '../config/api';
import activitiesRouter from './activities';
import leaderboardRouter from './leaderboard';
import teamsRouter from './teams';
import usersRouter from './users';
import workoutsRouter from './workouts';

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

apiRouter.use('/users', usersRouter);
apiRouter.use('/teams', teamsRouter);
apiRouter.use('/activities', activitiesRouter);
apiRouter.use('/leaderboard', leaderboardRouter);
apiRouter.use('/workouts', workoutsRouter);

export default apiRouter;
