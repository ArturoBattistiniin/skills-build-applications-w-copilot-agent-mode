import { Leaderboard } from '../models';
import { createResourceRouter } from './resourceRouter';

export default createResourceRouter(Leaderboard, {
  sort: { points: -1 },
  populate: ['user', 'team'],
});
