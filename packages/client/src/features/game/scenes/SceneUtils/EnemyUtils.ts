import { SquadPositionedObject } from '../../game-object/GameObject';
import { GameObjectGraphics } from '../../game-object/components/Graphics/GameObjectGraphics';
import { OrdinaryEnemyObjectPhysics } from '../../game-object/components/OrdinaryEnemyObjectPhysics';
import { WarriorEnemyObjectPhysics } from '../../game-object/components/WarriorEnemyObjectPhysics';
import { Vector2 } from '../../utils/Vector2';
import { GameObjectCollection } from './../../utils/GameObjectCollection';
import { EnemyCreateConfigType } from '../../Config';
import { createBullet } from './BulletUtils';
import { SceneTimeMetrics } from '../SceneInterface';

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
        enemyConfig.size,
        0,
        movementRadius,
        enemyVector,
        new WarriorEnemyObjectPhysics(performance.now(), enemyConfig),
        new GameObjectGraphics()
      );
      enemyCollection.push(enemy);
    } else if (squadRow === 2) {
      const enemy = new SquadPositionedObject(
        new Vector2(
          enemyConfig.canvasSize.width,
          enemyConfig.canvasSize.height / 8
        ),
        enemyConfig.size,
        0,
        movementRadius,
        enemyVector,
        new OrdinaryEnemyObjectPhysics(performance.now(), enemyConfig),
        new GameObjectGraphics()
      );
      enemyCollection.push(enemy);
    } else if (squadRow === 3) {
      const enemy = new SquadPositionedObject(
        new Vector2(0, enemyConfig.canvasSize.height / 6),
        enemyConfig.size,
        0,
        movementRadius,
        enemyVector,
        new WarriorEnemyObjectPhysics(performance.now(), enemyConfig),
        new GameObjectGraphics()
      );
      enemyCollection.push(enemy);
    }
  }
}

export function enemyFireAction(
  bulletCreateDelay: number,
  config: EnemyCreateConfigType,
  timeMetrics: SceneTimeMetrics,
  enemyBulletCollection: GameObjectCollection
) {
  return (position: Vector2, lastBulletCreateTime: number) => {
    const currentBulletCreateTime = performance.now();
    if (
      currentBulletCreateTime >
      lastBulletCreateTime + config.bulletCreateDelay
    ) {
      const bullet = createBullet(
        position,
        config.bulletSize,
        config.size,
        false
      );
      enemyBulletCollection.push(bullet);
      timeMetrics.lastAttackCreateTime = currentBulletCreateTime;
    }
  };
}
