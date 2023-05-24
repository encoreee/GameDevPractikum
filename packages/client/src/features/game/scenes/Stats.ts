class Stats {
  public score = 0;
  public shoot = 0;
  public hit = 0;
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
}

export default new Stats();
