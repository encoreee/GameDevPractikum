import { GameObjectComponent } from '../Graphics/Components';
import { GameObject } from '../Objects/GameObject';

export class GameObjectPhysics implements GameObjectComponent {
  public update(gameObject: GameObject, dt: number): void {
    return;
  }
}
