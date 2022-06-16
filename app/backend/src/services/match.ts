import Team from '../database/models/team';
import Match from '../database/models/match';
import MatchInProgress from '../interfaces/MatchInProgress';

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

  public create = async (match: MatchInProgress) => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = match;
    const createdMatch = await Match.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
    });

    return createdMatch;
  };
}

export default MatchService;
