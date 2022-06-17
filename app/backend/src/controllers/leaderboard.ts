import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard';

class LeaderboardController {
  public leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public getLeaderboard = async (req: Request, res: Response) => {
    const completeLeaderboard = await this.leaderboardService.completeLeaderboard();

    res.status(200).json(completeLeaderboard);
  };
}

export default LeaderboardController;
