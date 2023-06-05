import { Canvas } from '@/features/game/core/Canvas';
import { GameObject } from '../Objects/GameObject';
import { GraphicComponent } from './Components';
import { isServer } from '@/shared/helpers/serverHelper';

export class PlayerLiveObjectGraphics implements GraphicComponent {
  private readonly canvas = Canvas;
  public render(gameObject: GameObject, dt: number): void {
    if (!isServer()) {
      this.canvas.getContext2D().fillStyle = 'yellow';
      this.canvas
        .getContext2D()
        .fillRect(
          gameObject.position.x + dt,
          gameObject.position.y + dt,
          gameObject.size.width + dt,
          gameObject.size.height + dt
        );
    }
  }
}
