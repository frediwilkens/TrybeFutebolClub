import Team from '../database/models/team';
import Match from '../database/models/match';
import MatchInterface from '../interfaces/Match.interface';

class MatchService {
  public getAll = async () => {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  };

  public getByInProgress = async (inProgress:boolean) => {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: { inProgress },
    });

    return matches;
  };

  public create = async (match: MatchInterface) => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = match;

    const foundHomeTeam = await Team.findByPk(homeTeam);
    const foundAwayTeam = await Team.findOne({ where: { id: awayTeam } });

    if (!foundHomeTeam || !foundAwayTeam) throw new Error('There is no team with such id!');

    const createdMatch = await Match.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
    });

    return createdMatch;
  };

  public finish = async (id: number) => {
    await Match.update({ inProgress: false }, {
      where: {
        id,
      },
    });

    return { message: 'Finished' };
  };

  public update = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    await Match.update({ homeTeamGoals, awayTeamGoals }, {
      where: {
        id,
      },
    });
  };
}

export default MatchService;
