import { Size } from './game-object/components/Graphics/Components';

export type PlayerCreateConfigType = {
  size: Size;
  canvasSize: Size;
  bulletSize: Size;
  bulletCreateDelay: number;
  bulletSpeed: number;
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
  numberPerRow: number;
  numberEnemy: number;
  gap: number;
  size: Size;
  ordinaryEnemySize: Size;
  warriorEnemySize: Size;
  canvasSize: Size;
  paddingTop: number;
  bulletSize: Size;
  shotDeceleration: number;
  BULLET_CREATE_DELAY: number;
  ENEMY_CREATE_DELAY: number;
  ENEMY_ROW_CREATE_DELAY: number;
  ENEMY_WAVE_CREATE_DELAY: number;
  enemyPhisicsConfig: EnemyPhysicsConfigType;
  enemyPoints: EnemyPointsConfigType;
};

export type EnemyPhysicsConfigType = {
  // Скорости движения по умолчанию для направлений
  DEFAULT_X_SPEED: number;
  DEFAULT_Y_SPEED: number;
  DEFAULT_ANGLE_INCREMENT: number;
  //Eсли расстояние меньше указанного то, скорость устанавливается в DEFAULT_POSIOTION_EXIT_SPEED
  POSITION_EXIT_SPEED_BARRIER: number;
  //Скорость выхода на позицию в матрице расположения
  DEFAULT_POSIOTION_EXIT_SPEED: number;
};

export type EnemyPointsConfigType = {
  defaultPointsValue: number;
};

export const canvasSize: Size = {
  width: 700,
  height: 900,
};

export const playerConfig: PlayerCreateConfigType = {
  size: {
    width: 80,
    height: 80,
  },
  canvasSize,
  paddingBottom: 50,
  speed: 500,
  bulletCreateDelay: 200,
  bulletSize: {
    width: 25,
    height: 50,
  },
  bulletSpeed: 1000,
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
  ordinaryEnemySize: {
    width: 60,
    height: 40,
  },
  warriorEnemySize: {
    width: 40,
    height: 35,
  },
  shotDeceleration: 3,
  BULLET_CREATE_DELAY: 800,
  ENEMY_CREATE_DELAY: 300,
  ENEMY_ROW_CREATE_DELAY: 1500,
  ENEMY_WAVE_CREATE_DELAY: 3500,
  bulletSize: {
    width: 25,
    height: 50,
  },
  enemyPhisicsConfig: {
    DEFAULT_X_SPEED: 400,
    DEFAULT_Y_SPEED: 100,
    DEFAULT_ANGLE_INCREMENT: 0.1,
    POSITION_EXIT_SPEED_BARRIER: 250,
    DEFAULT_POSIOTION_EXIT_SPEED: 200,
  },
  enemyPoints: { defaultPointsValue: 100 },
};
