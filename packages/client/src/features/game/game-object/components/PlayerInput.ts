import { ActionFlagType } from '../../core/KeyboardController';
import { Vector2 } from '../../utils/Vector2';
import { GameObject } from '../GameObject';
import { GameObjectComponent } from './Components';

export class PlayerInput implements GameObjectComponent {
  private velocity: Vector2;
  constructor(
    private actionFlag: ActionFlagType,
    private speed: number,
    private fireCallback: (position: Vector2) => void
  ) {
    this.velocity = new Vector2(0, 0);
  }

  update(gameObject: GameObject, dt: number): void {
    if (this.actionFlag.LEFT) {
      this.velocity = new Vector2(-this.speed, 0);
    } else if (this.actionFlag.RIGHT) {
      this.velocity = new Vector2(this.speed, 0);
    } else {
      this.velocity = new Vector2(0, 0);
    }

    if (this.velocity.x !== 0) {
      gameObject.position = gameObject.position.add(this.velocity.multiply(dt));
    }

    if (this.actionFlag.FIRE) {
      this.fireCallback(gameObject.position);
    }
  }
}
