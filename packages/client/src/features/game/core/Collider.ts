import { Vector2 } from '../utils/Vector2';
import { GameObject, Size } from '../game-object/GameObject';

export class Collider {
  constructor(private readonly gameObject: GameObject) {}
  public collideWith(other: GameObject): boolean {
    return false;
  }
  public collideWithWall(canvasSize: Size): boolean {
    return (
      this.gameObject.position.x < 0 ||
      this.gameObject.position.x + this.gameObject.size.width >
        canvasSize.width ||
      this.gameObject.position.y < 0 ||
      this.gameObject.position.y + this.gameObject.size.height >
        canvasSize.height
    );
  }
}
