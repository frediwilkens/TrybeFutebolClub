import SeasonData from '../utilities/SeasonData';
import TeamSeason from '../interfaces/TeamSeason';
import Match from '../database/models/match';
import MatchService from './match';
import TeamService from './team';

class LeaderboardService {
  public teamService: TeamService;
  public matchService: MatchService;

  constructor() {
    this.teamService = new TeamService();
    this.matchService = new MatchService();
  }

  private insertVictories = async (id:number, matches:Match[], seasonData:SeasonData) => {
    const allTeamMatches = matches
      .filter((matche) => (
        matche.homeTeam === id || matche.awayTeam === id) && matche.inProgress === false);
    allTeamMatches.forEach((match) => {
      if (match.homeTeam === id && match.homeTeamGoals > match.awayTeamGoals) {
        seasonData.sumTotalVictories(1);
        seasonData.sumTotalPts(3);
        seasonData.sumTotalGames(1);
      }

      if (match.awayTeam === id && match.awayTeamGoals > match.homeTeamGoals) {
        seasonData.sumTotalVictories(1);
        seasonData.sumTotalPts(3);
        seasonData.sumTotalGames(1);
      }
    });
  };

  private insertLosses = async (id:number, matches:Match[], seasonData:SeasonData) => {
    const allTeamMatches = matches
      .filter((matche) => (
        matche.homeTeam === id || matche.awayTeam === id) && matche.inProgress === false);

    allTeamMatches.forEach((match) => {
      if (match.homeTeam === id && match.homeTeamGoals < match.awayTeamGoals) {
        seasonData.sumTotalLosses(1);
        seasonData.sumTotalGames(1);
      }

      if (match.awayTeam === id && match.awayTeamGoals < match.homeTeamGoals) {
        seasonData.sumTotalLosses(1);
        seasonData.sumTotalGames(1);
      }
    });
  };

  private insertDraws = async (id:number, matches:Match[], seasonData:SeasonData) => {
    const allTeamMatches = matches
      .filter((matche) => (
        matche.homeTeam === id || matche.awayTeam === id) && matche.inProgress === false);

    allTeamMatches.forEach((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        seasonData.sumTotalDraws(1);
        seasonData.sumTotalPts(1);
        seasonData.sumTotalGames(1);
      }
    });
  };

  private insertGoalsFavor = async (id:number, matches:Match[], seasonData:SeasonData) => {
    const allTeamMatches = matches
      .filter((matche) => (
        matche.homeTeam === id || matche.awayTeam === id) && matche.inProgress === false);

    allTeamMatches.forEach((match) => {
      if (match.homeTeam === id) {
        seasonData.sumGoalsFavor(match.homeTeamGoals);
      }

      if (match.awayTeam === id) {
        seasonData.sumGoalsFavor(match.awayTeamGoals);
      }
    });
  };

  private insertGoalsOwn = async (id:number, matches:Match[], seasonData:SeasonData) => {
    const allTeamMatches = matches
      .filter((matche) => (
        matche.homeTeam === id || matche.awayTeam === id) && matche.inProgress === false);

    allTeamMatches.forEach((match) => {
      if (match.homeTeam === id) {
        seasonData.sumGoalsOwn(match.awayTeamGoals);
      }

      if (match.awayTeam === id) {
        seasonData.sumGoalsOwn(match.homeTeamGoals);
      }
    });
  };

  public sortClassification = (array:TeamSeason[]) => {
    const result = array.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            if (a.goalsFavor === b.goalsFavor) {
              return a.goalsOwn - b.goalsOwn;
            }
            return b.goalsFavor - a.goalsFavor;
          }
          return b.goalsBalance - a.goalsBalance;
        }
        return b.totalVictories - a.totalVictories;
      }
      return b.totalPoints - a.totalPoints;
    });

    return result;
  };

  public completeLeaderboard = async () => {
    const allTeams = await this.teamService.getAll();
    const allMatches = await this.matchService.getAll();
    const classification:TeamSeason[] = [];

    allTeams.forEach((team) => {
      const teamInfos = new SeasonData();
      teamInfos.changeName(team.teamName);
      this.insertVictories(team.id, allMatches, teamInfos);
      this.insertLosses(team.id, allMatches, teamInfos);
      this.insertDraws(team.id, allMatches, teamInfos);
      this.insertGoalsFavor(team.id, allMatches, teamInfos);
      this.insertGoalsOwn(team.id, allMatches, teamInfos);
      const tableLine = teamInfos.teamStatus();
      classification.push(tableLine);
    });

    const finalResult = this.sortClassification(classification);
    return finalResult;
  };
}

export default LeaderboardService;
