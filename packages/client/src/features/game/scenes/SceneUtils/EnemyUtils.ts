import {
  GameObject,
  SquadPositionedObject,
} from '../../game-object/components/Objects/GameObject';
import { Vector2 } from '../../utils/Vector2';
import { GameObjectCollection } from './../../utils/GameObjectCollection';
import { EnemyCreateConfigType } from '../../Config';
import { createBullet } from './BulletUtils';
import { SceneTimeMetrics } from '../SceneInterface';
import { WarriorEnemyObjectPhysics } from '../../game-object/components/Physics/WarriorEnemyObjectPhysics';
import { OrdinaryEnemyObjectPhysics } from '../../game-object/components/Physics/OrdinaryEnemyObjectPhysics';
import {
  EnemyType,
  EnemyObjectGraphics,
} from '../../game-object/components/Graphics/EnemyObjectGraphics';

export function createEnemy(
  enemyCollection: GameObjectCollection,
  enemyConfig: EnemyCreateConfigType,
  xSquadPositionConst: number,
  ySquadPositionConst: number,
  movementRadius: number,
  enemyNumber: number
): void {
  {
    const squadRow = Math.floor(enemyNumber / enemyConfig.numberPerRow) + 1;
    let enemyNumberRest = enemyNumber;
    while (!(enemyNumberRest < enemyConfig.numberPerRow)) {
      enemyNumberRest -= enemyConfig.numberPerRow;
    }
    const enemyVector = new Vector2(
      xSquadPositionConst +
        (enemyConfig.size.width + enemyConfig.gap) * enemyNumberRest,
      ySquadPositionConst * squadRow * 2
    );

    if (squadRow === 1) {
      const enemy = new SquadPositionedObject(
        new Vector2(0, enemyConfig.canvasSize.height / 8),
        enemyConfig.warriorEnemySize,
        0,
        movementRadius,
        enemyVector,
        new WarriorEnemyObjectPhysics(performance.now(), enemyConfig),
        new EnemyObjectGraphics(EnemyType.WARRIOR)
      );
      enemyCollection.push(enemy);
    } else if (squadRow === 2) {
      const enemy = new SquadPositionedObject(
        new Vector2(
          enemyConfig.canvasSize.width,
          enemyConfig.canvasSize.height / 8
        ),
        enemyConfig.ordinaryEnemySize,
        0,
        movementRadius,
        enemyVector,
        new OrdinaryEnemyObjectPhysics(performance.now(), enemyConfig),
        new EnemyObjectGraphics(EnemyType.ORDINARY)
      );
      enemyCollection.push(enemy);
    } else if (squadRow === 3) {
      const enemy = new SquadPositionedObject(
        new Vector2(0, enemyConfig.canvasSize.height / 6),
        enemyConfig.warriorEnemySize,
        0,
        movementRadius,
        enemyVector,
        new WarriorEnemyObjectPhysics(performance.now(), enemyConfig),
        new EnemyObjectGraphics(EnemyType.WARRIOR)
      );
      enemyCollection.push(enemy);
    }
  }
}

export function enemyFireAction(
  config: EnemyCreateConfigType,
  timeMetrics: SceneTimeMetrics,
  enemyBulletCollection: GameObjectCollection
) {
  return (object: GameObject, lastBulletCreateTime: number) => {
    const currentBulletCreateTime = performance.now();
    if (
      currentBulletCreateTime >
      lastBulletCreateTime + config.BULLET_CREATE_DELAY
    ) {
      const bullet = createBullet(
        object.position,
        config.bulletSize,
        object.size,
        false
      );
      enemyBulletCollection.push(bullet);
      timeMetrics.lastAttackCreateTime = currentBulletCreateTime;
    }
  };
}
