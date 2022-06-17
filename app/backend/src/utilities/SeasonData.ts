class SeasonData {
  private _name: string;
  private _totalPoints: number;
  private _totalGames: number;
  private _totalVictories: number;
  private _totalDraws: number;
  private _totalLosses: number;
  private _goalsFavor: number;
  private _goalsOwn: number;
  private _goalsBalance: number;
  private _efficiency: number;

  constructor() {
    this._name = '';
    this._totalPoints = 0;
    this._totalGames = 0;
    this._totalVictories = 0;
    this._totalDraws = 0;
    this._totalLosses = 0;
    this._goalsFavor = 0;
    this._goalsOwn = 0;
    this._goalsBalance = 0;
    this._efficiency = 0;
  }

  public changeName = (name: string) => {
    this._name = name;
  };

  public sumTotalPts = (points: number) => {
    this._totalPoints += points;
  };

  public sumTotalGames = (games: number) => {
    this._totalGames += games;
  };

  public sumTotalVictories = (victories: number) => {
    this._totalVictories += victories;
  };

  public sumTotalDraws = (draws: number) => {
    this._totalDraws += draws;
  };

  public sumTotalLosses = (losses: number) => {
    this._totalLosses += losses;
  };

  public sumGoalsFavor = (goalsFavor: number) => {
    this._goalsFavor += goalsFavor;
  };

  public sumGoalsOwn = (goalsOwn: number) => {
    this._goalsOwn += goalsOwn;
  };

  public sumGoalsBalance = () => {
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
    return this._goalsBalance;
  };

  public calculateEfficiency = () => {
    const maxPoints = this._totalGames * 3;
    this._efficiency = Number(((this._totalPoints / maxPoints) * 100).toFixed(2));
    return this._efficiency;
  };

  public teamStatus() {
    return {
      name: this._name,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this.sumGoalsBalance(),
      efficiency: this.calculateEfficiency(),
    };
  }
}

export default SeasonData;
