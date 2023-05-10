import { Vector2 } from '../../utils/Vector2';
import {
  GameObjectComponent,
  GameObject,
  EnemyBulletObject,
} from '../GameObject';

export class PlayerBulletPhysics implements GameObjectComponent {
  public update(playerBulletObject: GameObject, dt: number): void {
    playerBulletObject.position = playerBulletObject.position.add(
      new Vector2(0, -1000).multiply(dt)
    );
  }
}

export class EnemyBulletPhysics implements GameObjectComponent {
  public update(
    enemyBulletObject: EnemyBulletObject,
    dt: number,
    _: number,
    playerObject: GameObject
  ): void {
    if (!enemyBulletObject.shuted) {
      enemyBulletObject.defaultAttackDirection = playerObject.position
        .substract(enemyBulletObject.position)
        .divide(3);

      enemyBulletObject.shuted = true;
    }

    enemyBulletObject.position = enemyBulletObject.position.add(
      enemyBulletObject.defaultAttackDirection.multiply(dt)
    );
  }
}
