import { Size } from './game-object/components/Graphics/Components';
import {
  EnemyMovement,
  MovementTypes,
  PI,
} from './game-object/components/Physics/EnemyPhysicsTypes';
import { Vector2 } from './utils/Vector2';

export type PlayerCreateConfigType = {
  size: Size;
  canvasSize: Size;
  bulletSize: Size;
  bulletCreateDelay: number;
  bulletSpeed: number;
  paddingBottom: number;
  speed: number;
  playerLives: PlayerLivesConfigType;
};

export type PlayerLivesConfigType = {
  lives: number;
  gap: number;
  size: Size;
};

export type LabelsConfigType = {
  pointPosition: Vector2;
  mainLabelPosition: Vector2;
  pointFontSize: number;
  mainLabelFontSize: number;
  pointsLabelColor: string;
  mainLabelColor: string;
};

export type EnemyConfigType = {
  size: Size;
  moveRadius: number;
};

export type SceneEnemyCreateConfigType = {
  numberPerRow: number;
  numberEnemy: number;
  enemiesWaveCount: number;
  gap: number;
  enemyShotDeceleration: number;
  levelLabel: string;
  BULLET_CREATE_DELAY: number;
  ENEMY_CREATE_DELAY: number;
  ENEMY_ROW_CREATE_DELAY: number;
  ENEMY_WAVE_CREATE_DELAY: number;
};

export type EnemyCreateConfigType = {
  size: Size;
  ordinaryEnemyConfig: EnemyConfigType;
  warriorEnemyConfig: EnemyConfigType;
  canvasSize: Size;
  paddingTop: number;
  bulletSize: Size;
  enemyPhisicsConfig: EnemyPhysicsConfigType;
  enemyPoints: EnemyPointsConfigType;
};

export type EnemyPhysicsConfigType = {
  // Скорости движения по умолчанию для направлений
  DEFAULT_SPEED: number;
  // Приращение угла по умолчанию
  DEFAULT_ANGLE_INCREMENT: number;
  //Eсли расстояние меньше указанного то, скорость устанавливается в DEFAULT_POSIOTION_EXIT_SPEED
  POSITION_EXIT_SPEED_BARRIER: number;
  //Скорость выхода на позицию в матрице расположения
  DEFAULT_POSIOTION_EXIT_SPEED: number;
  //Точность сближения врага с целевой позицией
  DISTANCE_PRESICION: number;
};

export type EnemyPointsConfigType = {
  defaultPointsValue: number;
};

export type enemyExplosionConfigType = {
  size: Size;
  exposionDelay: number;
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

export const enemyExplosionConfig: enemyExplosionConfigType = {
  size: {
    width: 60,
    height: 60,
  },
  exposionDelay: 7,
};

export const labelsConfig = {
  pointPosition: new Vector2(10, 40),
  mainLabelPosition: new Vector2(
    canvasSize.width / 2 - 125,
    canvasSize.height / 2 - 25
  ),
  pointFontSize: 23,
  mainLabelFontSize: 30,
  pointsLabelColor: 'blue',
  mainLabelColor: 'white',
};

export const enemyConfig: EnemyCreateConfigType = {
  canvasSize,
  paddingTop: 50,
  size: {
    width: 50,
    height: 50,
  },
  ordinaryEnemyConfig: {
    size: { width: 60, height: 40 },
    moveRadius: 300,
  },
  warriorEnemyConfig: {
    size: { width: 40, height: 35 },
    moveRadius: 300,
  },
  bulletSize: {
    width: 25,
    height: 50,
  },
  enemyPhisicsConfig: {
    DEFAULT_SPEED: 200,
    DEFAULT_ANGLE_INCREMENT: 0.1,
    POSITION_EXIT_SPEED_BARRIER: 250,
    DEFAULT_POSIOTION_EXIT_SPEED: 200,
    DISTANCE_PRESICION: 10,
  },
  enemyPoints: { defaultPointsValue: 100 },
};

export const KEY_BINDINGS = {
  fullScreen: 'f',
} as const;

export const ordinaryEnemyMovementArr: EnemyMovement[] = [
  {
    type: MovementTypes.LINEAR,
    targetPosition: new Vector2(100, 500),
  },
  {
    type: MovementTypes.CIRCLE,
    startAngle: (PI / 4) * 5,
    roundsCount: 0.4,
    direction: 'negative',
  },
  {
    type: MovementTypes.LINEAR,
    targetPosition: new Vector2(enemyConfig.canvasSize.width - 200, 600),
  },
  {
    type: MovementTypes.CIRCLE,
    startAngle: 0,
    roundsCount: 0.8,
    direction: 'positive',
  },
  {
    type: MovementTypes.LINEAR,
    targetPosition: new Vector2(100, 100),
  },
  {
    type: MovementTypes.CIRCLE,
    startAngle: 0,
    roundsCount: 0.75,
    direction: 'negative',
  },
  {
    type: MovementTypes.LINEAR,
    targetPosition: new Vector2(
      enemyConfig.canvasSize.width / 2,
      enemyConfig.canvasSize.height / 2 - 200
    ),
  },
  {
    type: MovementTypes.CIRCLE,
    startAngle: 0,
    roundsCount: 1,
    direction: 'positive',
  },
  {
    type: MovementTypes.RETURNING,
  },
  {
    type: MovementTypes.STOP,
  },
];

export const warriorEnemyMovementArr: EnemyMovement[] = [
  {
    type: MovementTypes.LINEAR,
    targetPosition: new Vector2(enemyConfig.canvasSize.width - 200, 500),
  },
  {
    type: MovementTypes.CIRCLE,
    startAngle: 0,
    roundsCount: 0.5,
    direction: 'negative',
  },
  {
    type: MovementTypes.LINEAR,
    targetPosition: new Vector2(enemyConfig.canvasSize.width - 200, 100),
  },
  {
    type: MovementTypes.CIRCLE,
    startAngle: 0,
    roundsCount: 0.8,
    direction: 'negative',
  },
  {
    type: MovementTypes.LINEAR,
    targetPosition: new Vector2(100, 600),
  },
  {
    type: MovementTypes.CIRCLE,
    startAngle: 0,
    roundsCount: 0.75,
    direction: 'positive',
  },
  {
    type: MovementTypes.LINEAR,
    targetPosition: new Vector2(100, 250),
  },
  {
    type: MovementTypes.CIRCLE,
    startAngle: 0,
    roundsCount: 1,
    direction: 'positive',
  },
  {
    type: MovementTypes.RETURNING,
  },
  {
    type: MovementTypes.STOP,
  },
];

export const interseptorEnemyMovementArr: EnemyMovement[] = [
  {
    type: MovementTypes.LINEAR,
    targetPosition: new Vector2(200, 500),
  },
  {
    type: MovementTypes.CIRCLE,
    startAngle: 0,
    roundsCount: 0.5,
    direction: 'negative',
  },
  {
    type: MovementTypes.LINEAR,
    targetPosition: new Vector2(
      enemyConfig.canvasSize.width / 2,
      enemyConfig.canvasSize.height / 2
    ),
  },
  {
    type: MovementTypes.CIRCLE,
    startAngle: 0,
    roundsCount: 0.8,
    direction: 'negative',
  },
  {
    type: MovementTypes.LINEAR,
    targetPosition: new Vector2(100, 600),
  },
  {
    type: MovementTypes.CIRCLE,
    startAngle: 0,
    roundsCount: 0.75,
    direction: 'positive',
  },
  {
    type: MovementTypes.LINEAR,
    targetPosition: new Vector2(enemyConfig.canvasSize.width - 150, 150),
  },
  {
    type: MovementTypes.CIRCLE,
    startAngle: 0,
    roundsCount: 1,
    direction: 'positive',
  },
  {
    type: MovementTypes.RETURNING,
  },
  {
    type: MovementTypes.STOP,
  },
];
