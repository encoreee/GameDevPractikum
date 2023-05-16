import { GameObject } from '../GameObject';
import { GameObjectComponent } from './Components';

export class GameObjectPhysics implements GameObjectComponent {
  public update(gameObject: GameObject, dt: number): void {
    return;
  }
}
