class Stats {
  private score = 0;
  private shoot = 0;
  private hit = 0;
  public incrementPlayerShoot() {
    this.shoot++;
  }
  public incrementPlayerHit() {
    this.hit++;
  }
  public updatePlayerScore(score: number) {
    this.score = score;
  }
  public resetStats() {
    this.hit = 0;
    this.shoot = 0;
    this.score = 0;
  }

  public getStats() {
    return {
      score: this.score,
      shoot: this.shoot,
      hit: this.hit,
    };
  }
}

export default new Stats();

export type GameStats = {
  score: number;
  shoot: number;
  hit: number;
};
