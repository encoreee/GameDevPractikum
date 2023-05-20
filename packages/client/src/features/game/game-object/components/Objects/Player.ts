import { Vector2 } from '@/features/game/utils/Vector2';
import {
  GameObjectComponent,
  GraphicComponent,
  Size,
} from '../Graphics/Components';
import { GameObject } from './GameObject';
import { PlayerInput } from '../Graphics/PlayerInput';

export class Player extends GameObject {
  private readonly input: PlayerInput;

  constructor(
    position: Vector2,
    size: Size,
    input: PlayerInput,
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

  public setShutAbility(ability: boolean) {
    this.input.setShootAbility(ability);
  }
}
