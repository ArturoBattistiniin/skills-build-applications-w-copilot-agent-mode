import { Activity } from '../models';
import { createResourceRouter } from './resourceRouter';

export default createResourceRouter(Activity, { populate: ['user'] });
