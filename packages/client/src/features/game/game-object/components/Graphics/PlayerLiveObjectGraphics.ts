import { Canvas } from '@/features/game/core/Canvas';
import { GameObject } from '../Objects/GameObject';
import { GraphicComponent } from './Components';
import heart from '@/assets/heart.png';

export class PlayerLiveObjectGraphics implements GraphicComponent {
  private readonly canvas = Canvas;
  public render(gameObject: GameObject, dt: number): void {
    const img = new Image();
    img.src = heart;
    this.canvas
      .getContext2D()
      .drawImage(
        img,
        gameObject.position.x + dt,
        gameObject.position.y + dt,
        gameObject.size.width + dt,
        gameObject.size.height + dt
      );
  }
}
