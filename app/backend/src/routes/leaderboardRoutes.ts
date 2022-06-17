import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard';

const leaderboardRoutes = Router();
const leaderboardController = new LeaderboardController();

leaderboardRoutes.get('/', leaderboardController.getLeaderboard);

export default leaderboardRoutes;
