import { Router } from 'express';
import loginRoutes from './login.routes';
import matchRoutes from './match.routes';
import teamRoutes from './team.routes';
import leaderboardRoutes from './leaderboard.routes';

const route = Router();

route.use('/login', loginRoutes);
route.use('/teams', teamRoutes);
route.use('/matches', matchRoutes);
route.use('/leaderboard', leaderboardRoutes);

export default route;
