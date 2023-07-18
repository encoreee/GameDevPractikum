import { Canvas } from '../../../core/Canvas';
import { GameObject } from '../Objects/GameObject';
import { GraphicComponent } from './Components';
import source from '../../../../../assets/mainship/MainShipFullHealth.svg';

export class PlayerObjectGraphics implements GraphicComponent {
  private readonly canvas = Canvas;
  private img?: HTMLImageElement;
  constructor() {
    this.img = new Image();
    this.img.src = source;
  }
  public render(gameObject: GameObject, dt: number): void {
    if (this.img) {
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
}
