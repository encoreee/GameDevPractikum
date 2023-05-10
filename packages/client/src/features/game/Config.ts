import { Size } from './game-object/GameObject';
import {
  EnemyCreateConfigType,
  PlayerCreateConfigType,
} from './scenes/GameScene';

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
  bulletCreateDelay: 450,
  bulletSize: {
    width: 10,
    height: 10,
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
  bulletSize: {
    width: 10,
    height: 10,
  },
};
