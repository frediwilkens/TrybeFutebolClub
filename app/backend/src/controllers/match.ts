import { Request, Response } from 'express';
import MatchService from '../services/match';

class MatchController {
  matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    let matches;

    if (!inProgress) {
      matches = await this.matchService.getAll();
      return res.status(200).json(matches);
    }

    matches = await this.matchService.getByInProgress(inProgress === 'true');
    return res.status(200).json(matches);
  };

  public create = async (req: Request, res: Response) => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = req.body;

    const createdMatch = await this.matchService
      .create({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress });

    return res.status(201).json(createdMatch);
  };
}

export default MatchController;
