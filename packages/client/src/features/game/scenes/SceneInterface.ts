export type SceneTimeMetrics = {
  startDelay: number;
  canStart: boolean;
  absoluteTime: number;
  lastAttackCreateTime: number;
  lastEnemyCreateTime: number;
  lastEnemyKillTime: number;
};

export type SceneEnemyMetrics = {
  currentRow: number;
  startX: number;
  startY: number;
  enemiesSquadCount: number;
  enemiesWaveCount: number;
  currentEnemiesWave: number;
};
export type SceneReferenceMetrics = {
  levelLabel: string;
};

export interface SceneInterface {
  init(): void;
  update(dt: number): void;
  render(dt: number): void;
}
