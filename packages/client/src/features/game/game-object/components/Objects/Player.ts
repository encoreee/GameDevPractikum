import { Vector2 } from '@/features/game/utils/Vector2';
import {
  GameObjectComponent,
  GraphicComponent,
  Size,
} from '../Graphics/Components';
import { GameObject } from './GameObject';

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
