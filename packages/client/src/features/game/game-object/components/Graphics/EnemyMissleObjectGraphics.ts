import { Canvas } from '../../../core/Canvas';
import { GameObject } from '../Objects/GameObject';
import { GraphicComponent } from './Components';
import source from '../../../../../assets/enemyMissle.png';

export class EnemyMissleObjectGraphics implements GraphicComponent {
  private readonly canvas = Canvas;
  private img: HTMLImageElement;
  constructor() {
    this.img = new Image();
    this.img.src = source;
    this.img.translate;
  }
  public render(gameObject: GameObject, dt: number): void {
    this.canvas
      .getContext2D()
      .drawImage(
        this.img,
        gameObject.position.x + dt,
        gameObject.position.y + dt,
        gameObject.size.width + dt,
        gameObject.size.height + dt
      );
  }
}
