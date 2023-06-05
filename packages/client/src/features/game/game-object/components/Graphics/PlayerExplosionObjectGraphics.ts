import { Canvas } from '../../../core/Canvas';
import { GameObject } from '../Objects/GameObject';
import { GraphicComponent } from './Components';
import { playerDamageExplosionImg } from './playerDamageExplosionImg';

const numColumns = 3;
const numRows = 3;

export class PlayerExplosionObjectGraphics implements GraphicComponent {
  private readonly canvas = Canvas;
  private currentFrame = 0;
  private counter = 0;
  public finished = false;
  private frameWidth = 0;
  private frameHeight = 0;
  constructor(private exposionDelay: number) {
    if (playerDamageExplosionImg) {
      this.frameWidth = playerDamageExplosionImg.width / numColumns;
      this.frameHeight = playerDamageExplosionImg.height / numRows;
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

    if (playerDamageExplosionImg) {
      this.canvas
        .getContext2D()
        .drawImage(
          playerDamageExplosionImg,
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
