import { Vector2 } from '../../utils/Vector2';
import { GameObjectComponent, CircleMovementObject } from '../GameObject';

export class EnemyObjectPhysics implements GameObjectComponent {
  public update(gameObject: CircleMovementObject, dt: number): void {
    const vx = Math.cos(gameObject.currentAngle) * gameObject.radius;
    const vy = Math.sin(gameObject.currentAngle) * gameObject.radius;

    gameObject.position = gameObject.position.add(
      new Vector2(vx, vy).multiply(dt)
    );

    gameObject.currentAngle += 0.1;

    return;
  }
}
