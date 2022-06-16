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
}

export default MatchController;
