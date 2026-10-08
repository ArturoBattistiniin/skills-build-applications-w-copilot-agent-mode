import { Router } from 'express';
import { apiBaseUrl } from '../config/api';
import activitiesRouter from './activities';
import leaderboardRouter from './leaderboard';
import teamsRouter from './teams';
import usersRouter from './users';
import workoutsRouter from './workouts';

const router = Router();

router.get('/api/', (_request, response) => {
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

router.use('/api/users', usersRouter);
router.use('/api/teams', teamsRouter);
router.use('/api/activities', activitiesRouter);
router.use('/api/leaderboard', leaderboardRouter);
router.use('/api/workouts', workoutsRouter);

export default router;
