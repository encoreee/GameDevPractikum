import { Vector2 } from '../utils/Vector2';
import {
  GameObject,
  GameObjectComponent,
  GraphicComponent,
  Size,
} from './GameObject';

export class Player extends GameObject {
  private readonly input: GameObjectComponent;

  constructor(
    position: Vector2,
    size: Size,
    input: GameObjectComponent,
    physics: GameObjectComponent,
    graphics: GraphicComponent
  ) {
    super(position, size, physics, graphics);
    this.input = input;
  }
  public update(dt: number): void {
    this.input.update(this, dt);
    super.update(dt);
  }
}
