import { Canvas } from '../../../core/Canvas';
import { GameObject } from '../Objects/GameObject';
import { GraphicComponent } from './Components';
import source from '../../../../../assets/explosion/explosion-sprite.png';

const numColumns = 5;
const numRows = 2;

export class ExplosionObjectGraphics implements GraphicComponent {
  private readonly canvas = Canvas;
  private currentFrame = 0;
  private counter = 0;
  public finished = false;
  private frameWidth = 0;
  private frameHeight = 0;
  private img: HTMLImageElement | undefined;
  constructor(private exposionDelay: number) {
    this.img = new Image();
    this.img.src = source;
    this.img.translate;
  }
  public render(gameObject: GameObject, dt: number): void {
    if (this.img) {
      this.frameWidth = this.img.width / numColumns;
      this.frameHeight = this.img.height / numRows;
    }
    this.counter++;
    const maxFrame = numColumns * numRows - 1;
    if (this.currentFrame > maxFrame) {
      return;
    }

    if (this.counter > this.exposionDelay) {
      this.counter = 0;
      this.currentFrame++;
    }
    const column = this.currentFrame % numColumns;
    const row = Math.floor(this.currentFrame / numColumns);

    if (this.img) {
      this.canvas
        .getContext2D()
        .drawImage(
          this.img,
          column * this.frameWidth,
          row * this.frameHeight,
          this.frameWidth,
          this.frameHeight,
          gameObject.position.x + dt,
          gameObject.position.y + dt,
          gameObject.size.width + dt,
          gameObject.size.height + dt
        );
    }
  }
}
