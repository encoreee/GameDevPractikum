import { isServer } from '@/shared/helpers/serverHelper';
import { Canvas } from '../../../core/Canvas';
import { GameObject } from '../Objects/GameObject';
import { GraphicComponent } from './Components';

export class GameObjectGraphics implements GraphicComponent {
  private readonly canvas = Canvas;
  public render(gameObject: GameObject, dt: number): void {
    if (!isServer()) {
      this.canvas.getContext2D().fillStyle = 'red';
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
