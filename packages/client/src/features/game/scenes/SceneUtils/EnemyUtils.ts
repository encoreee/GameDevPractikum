import {
  GameObject,
  SquadPositionedObject,
} from '../../game-object/components/Objects/GameObject';
import { Vector2 } from '../../utils/Vector2';
import { GameObjectCollection } from './../../utils/GameObjectCollection';
import {
  EnemyCreateConfigType,
  SceneEnemyCreateConfigType,
} from '../../Config';
import { createBullet } from './BulletUtils';
import { SceneEnemyMetrics, SceneTimeMetrics } from '../SceneInterface';
import {
  EnemyType,
  EnemyObjectGraphics,
} from '../../game-object/components/Graphics/EnemyObjectGraphics';
import Audio from '@/features/Audio/Audio';
import { AUDIO_IDS } from '@/features/Audio';
import {
  enemyConfig,
  ordinaryEnemyMovementArr,
  warriorEnemyMovementArr,
  interseptorEnemyMovementArr,
} from '../../Config';
import { EnemyObjectPhysics } from '../../game-object/components/Physics/EnemyObjectPhysics';

export type EnemyCreateParams = {
  squadPosition: Vector2;
  squadRow: number;
  enemyCollection: GameObjectCollection;
};

/**
 *
 * @param index
 * @param enemyMetrics
 * @param timeMetrics
 * @param enemyCollection
 * @returns
 */
export function tryCreateEnemy(
  index: number,
  enemyMetrics: SceneEnemyMetrics,
  timeMetrics: SceneTimeMetrics,
  enemyCollection: GameObjectCollection,
  sceneEnemyConfig: SceneEnemyCreateConfigType
) {
  return (lastEnemyCreateTime: number, lastEnemyKillTime: number) => {
    let enemyNumberRest = index;
    while (!(enemyNumberRest < sceneEnemyConfig.numberPerRow)) {
      enemyNumberRest -= sceneEnemyConfig.numberPerRow;
    }
    const squadRow = Math.floor(index / sceneEnemyConfig.numberPerRow) + 1;
    const squadPosition = new Vector2(
      enemyMetrics.startX +
        (enemyConfig.size.width + sceneEnemyConfig.gap) * enemyNumberRest,
      enemyMetrics.startY * squadRow * 2
    );

    const enemyParams: EnemyCreateParams = {
      squadPosition,
      squadRow,
      enemyCollection,
    };

    if (enemyMetrics.enemiesWaveCount === enemyMetrics.currentEnemiesWave) {
      if (enemyMetrics.currentRow === squadRow) {
        timeDelayConditionCreate(
          lastEnemyCreateTime,
          sceneEnemyConfig.ENEMY_CREATE_DELAY,
          timeMetrics,
          enemyMetrics,
          enemyParams
        );
      } else {
        timeDelayConditionCreate(
          lastEnemyCreateTime,
          sceneEnemyConfig.ENEMY_ROW_CREATE_DELAY,
          timeMetrics,
          enemyMetrics,
          enemyParams
        );
        enemyMetrics.currentRow = squadRow;
      }
    } else {
      timeDelayConditionCreate(
        lastEnemyKillTime,
        sceneEnemyConfig.ENEMY_WAVE_CREATE_DELAY,
        timeMetrics,
        enemyMetrics,
        enemyParams
      );
      enemyMetrics.currentEnemiesWave = enemyMetrics.enemiesWaveCount;
    }
  };
}

function timeDelayConditionCreate(
  enemyTimeLabel: number,
  createDelay: number,
  timeMetrics: SceneTimeMetrics,
  enemyMetrics: SceneEnemyMetrics,
  enemyParams: EnemyCreateParams
) {
  if (timeExpired(enemyTimeLabel, createDelay)) {
    createNewEnemy(
      enemyParams.enemyCollection,
      enemyConfig,
      enemyParams.squadPosition,
      enemyParams.squadRow
    );
    timeMetrics.lastEnemyCreateTime = performance.now();
    enemyMetrics.enemiesSquadCount++;
  }
}

function timeExpired(lastTime: number, delay: number): boolean {
  return performance.now() > lastTime + delay;
}

export function createNewEnemy(
  enemyCollection: GameObjectCollection,
  enemyConfig: EnemyCreateConfigType,
  squadPosition: Vector2,
  row: number
): void {
  {
    let enemy: SquadPositionedObject;
    switch (row) {
      case 1:
        enemy = enemy = new SquadPositionedObject(
          new Vector2(0, enemyConfig.canvasSize.height / 8),
          enemyConfig.warriorEnemyConfig.size,
          0,
          enemyConfig.warriorEnemyConfig.moveRadius,
          squadPosition,
          new EnemyObjectPhysics(
            performance.now(),
            enemyConfig,
            warriorEnemyMovementArr
          ),
          new EnemyObjectGraphics(EnemyType.WARRIOR)
        );
        enemyCollection.push(enemy);
        break;
      case 2:
        enemy = new SquadPositionedObject(
          new Vector2(
            enemyConfig.canvasSize.width,
            enemyConfig.canvasSize.height / 8
          ),
          enemyConfig.ordinaryEnemyConfig.size,
          0,
          enemyConfig.ordinaryEnemyConfig.moveRadius,
          squadPosition,
          new EnemyObjectPhysics(
            performance.now(),
            enemyConfig,
            ordinaryEnemyMovementArr
          ),
          new EnemyObjectGraphics(EnemyType.ORDINARY)
        );
        enemyCollection.push(enemy);
        break;
      case 3:
        enemy = new SquadPositionedObject(
          new Vector2(0, enemyConfig.canvasSize.height / 6),
          enemyConfig.warriorEnemyConfig.size,
          0,
          enemyConfig.warriorEnemyConfig.moveRadius,
          squadPosition,
          new EnemyObjectPhysics(
            performance.now(),
            enemyConfig,
            interseptorEnemyMovementArr
          ),
          new EnemyObjectGraphics(EnemyType.WARRIOR)
        );
        enemyCollection.push(enemy);
        break;

      default:
        break;
    }
  }
}

export function enemyFireAction(
  config: EnemyCreateConfigType,
  sceneEnemyConfig: SceneEnemyCreateConfigType,
  timeMetrics: SceneTimeMetrics,
  enemyBulletCollection: GameObjectCollection
) {
  return (object: GameObject, lastBulletCreateTime: number) => {
    const currentBulletCreateTime = performance.now();
    if (
      currentBulletCreateTime >
      lastBulletCreateTime + sceneEnemyConfig.BULLET_CREATE_DELAY
    ) {
      const bullet = createBullet(
        object.position,
        config.bulletSize,
        object.size,
        false
      );
      Audio.play(AUDIO_IDS.EnemyShoot);
      enemyBulletCollection.push(bullet);
      timeMetrics.lastAttackCreateTime = currentBulletCreateTime;
    }
  };
}
