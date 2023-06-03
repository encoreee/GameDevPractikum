import { Canvas } from '../../../core/Canvas';
import { GameObject } from '../Objects/GameObject';
import { GraphicComponent } from './Components';
import enemyExplosionImg from './enemyExplosionImg';

const numColumns = 5;
const numRows = 2;

export class ExplosionObjectGraphics implements GraphicComponent {
  private readonly canvas = Canvas;
  private currentFrame = 0;
  private counter = 0;
  public finished = false;
  private readonly frameWidth;
  private readonly frameHeight;
  constructor(private exposionDelay: number) {
    if (enemyExplosionImg) {
      this.frameWidth = enemyExplosionImg.width / numColumns;
      this.frameHeight = enemyExplosionImg.height / numRows;
    } else {
      this.frameWidth = 0;
      this.frameHeight = 0;
    }
  }
  public render(gameObject: GameObject, dt: number): void {
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

    if (enemyExplosionImg) {
      this.canvas
        .getContext2D()
        .drawImage(
          enemyExplosionImg,
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
