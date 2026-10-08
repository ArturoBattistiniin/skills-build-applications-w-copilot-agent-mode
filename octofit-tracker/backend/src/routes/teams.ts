import { Team } from '../models';
import { createResourceRouter } from './resourceRouter';

export default createResourceRouter(Team, { populate: ['members'] });
