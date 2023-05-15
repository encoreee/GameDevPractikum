import { Size } from './game-object/components/Components';

export type PlayerCreateConfigType = {
  size: Size;
  canvasSize: Size;
  bulletSize: Size;
  bulletCreateDelay: number;
  paddingBottom: number;
  speed: number;
  playerLives: PlayerLivesConfig;
};

export type PlayerLivesConfig = {
  lives: number;
  gap: number;
  size: Size;
};

export type EnemyCreateConfigType = {
  numberPerRow: 6;
  numberEnemy: number;
  gap: number;
  size: Size;
  canvasSize: Size;
  paddingTop: number;
  bulletSize: Size;
  bulletCreateDelay: number;
  enemyCreateDelay: number;
  enemyRowCreateDelay: number;
  enemyWaveCreateDelay: number;
};

export const canvasSize: Size = {
  width: 700,
  height: 900,
};

export const playerConfig: PlayerCreateConfigType = {
  size: {
    width: 50,
    height: 50,
  },
  canvasSize,
  paddingBottom: 50,
  speed: 500,
  bulletCreateDelay: 200,
  bulletSize: {
    width: 10,
    height: 10,
  },
  playerLives: {
    lives: 3,
    size: {
      width: 10,
      height: 10,
    },
    gap: 10,
  },
};

export const enemyConfig: EnemyCreateConfigType = {
  numberPerRow: 6,
  numberEnemy: 18,
  canvasSize,
  gap: 50,
  paddingTop: 50,
  size: {
    width: 50,
    height: 50,
  },
  bulletCreateDelay: 800,
  enemyCreateDelay: 300,
  enemyRowCreateDelay: 1500,
  enemyWaveCreateDelay: 3500,
  bulletSize: {
    width: 10,
    height: 10,
  },
};
