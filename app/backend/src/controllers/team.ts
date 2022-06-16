import { Request, Response } from 'express';
import TeamService from '../services/team';

class TeamController {
  teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getAll();
    return res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const team = await this.teamService.getById(Number(id));

    if (!team) return res.status(400).json({ message: 'Team not found' });

    return res.status(200).json(team);
  };
}

export default TeamController;
