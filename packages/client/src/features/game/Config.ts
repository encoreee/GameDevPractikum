import { Size } from './game-object/GameObject';
import {
  EnemyCreateConfigType,
  PlayerCreateConfigType,
} from './scenes/GameScene';

export const canvasSize: Size = {
  width: 700,
  height: 500,
};

export const playerConfig: PlayerCreateConfigType = {
  size: {
    width: 50,
    height: 50,
  },
  canvasSize,
  paddingBottom: 50,
  speed: 500,
  bulletCreateDelay: 150,
  bulletSize: {
    width: 10,
    height: 10,
  },
};

export const enemyConfig: EnemyCreateConfigType = {
  numberEnemy: 6,
  canvasSize,
  gap: 25,
  paddingTop: 50,
  size: {
    width: 50,
    height: 50,
  },
};
