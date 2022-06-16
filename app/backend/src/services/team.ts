import Team from '../database/models/team';

class TeamService {
  public getAll = async () => {
    const teams = await Team.findAll();

    return teams;
  };

  public getById = async (id: number) => {
    const team = await Team.findByPk(id);

    return team;
  };
}

export default TeamService;
