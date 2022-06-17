import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard';

const leaderboardRoutes = Router();
const leaderboardController = new LeaderboardController();

leaderboardRoutes.get('/', leaderboardController.getLeaderboard);
leaderboardRoutes.get('/home', leaderboardController.getHomeLeaderboard);
leaderboardRoutes.get('/away', leaderboardController.getAwayLeaderboard);

export default leaderboardRoutes;
