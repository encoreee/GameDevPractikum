import { ActionFlagType } from '../../../core/KeyboardController';
import { Vector2 } from '../../../utils/Vector2';
import { GameObject } from '../Objects/GameObject';
import { GameObjectComponent } from './Components';

export class PlayerInput implements GameObjectComponent {
  private velocity: Vector2;
  public canShut: boolean;
  constructor(
    private actionFlag: ActionFlagType,
    private speed: number,
    private fireCallback: (position: Vector2) => void
  ) {
    this.velocity = new Vector2(0, 0);
    this.canShut = false;
  }

  setShutAbility(ability: boolean) {
    this.canShut = ability;
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
      if (this.canShut) {
        this.fireCallback(gameObject.position);
      }
    }
  }
}
