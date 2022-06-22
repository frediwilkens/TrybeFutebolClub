import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import HomeLeaderboardService from '../services/homeLeaderboard.service';
import AwayLeaderboardService from '../services/awayLeaderboard.service';

class LeaderboardController {
  public leaderboardService: LeaderboardService;
  public homeLeaderboardService: HomeLeaderboardService;
  public awayLeaderboardService: AwayLeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
    this.homeLeaderboardService = new HomeLeaderboardService();
    this.awayLeaderboardService = new AwayLeaderboardService();
  }

  public getLeaderboard = async (req: Request, res: Response) => {
    const completeLeaderboard = await this.leaderboardService.completeLeaderboard();

    res.status(200).json(completeLeaderboard);
  };

  public getHomeLeaderboard = async (req: Request, res: Response) => {
    const homeLeaderboard = await this.homeLeaderboardService.homeLeaderboard();

    res.status(200).json(homeLeaderboard);
  };

  public getAwayLeaderboard = async (req: Request, res: Response) => {
    const awayLeaderboard = await this.awayLeaderboardService.awayLeaderboard();

    res.status(200).json(awayLeaderboard);
  };
}

export default LeaderboardController;
