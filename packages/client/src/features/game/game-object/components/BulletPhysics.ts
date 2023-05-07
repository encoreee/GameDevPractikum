import { Vector2 } from '../../utils/Vector2';
import { GameObjectComponent, GameObject } from '../GameObject';

export class PlayerBulletPhysics implements GameObjectComponent {
  public update(gameObject: GameObject, dt: number): void {
    gameObject.position = gameObject.position.add(
      new Vector2(0, -1000).multiply(dt)
    );
  }
}

export class EnemyBulletPhysics implements GameObjectComponent {
  public update(gameObject: GameObject, dt: number): void {
    gameObject.position = gameObject.position.add(
      new Vector2(0, 250).multiply(dt)
    );
  }
}
