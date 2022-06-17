import { Router } from 'express';
import loginRoutes from './loginRoutes';
import matchRoutes from './matchRoutes';
import teamRoutes from './teamRoutes';
import leaderboardRoutes from './leaderboardRoutes';

const route = Router();

route.use('/login', loginRoutes);
route.use('/teams', teamRoutes);
route.use('/matches', matchRoutes);
route.use('/leaderboard', leaderboardRoutes);

export default route;
