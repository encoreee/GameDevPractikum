import { Canvas } from '../../../core/Canvas';
import { GameObject } from '../Objects/GameObject';
import { GraphicComponent } from './Components';
import ordinarySrc from '../../../../../assets/enemies/ordinaryEnemy.svg';
import warriorSrc from '../../../../../assets/enemies/warriorEnemy.svg';
import { isServer } from '@/shared/helpers/serverHelper';

export enum EnemyType {
  ORDINARY,
  WARRIOR,
}

export class EnemyObjectGraphics implements GraphicComponent {
  private readonly canvas = Canvas;
  private img: HTMLImageElement | undefined;
  constructor(enemyType: EnemyType) {
    if (!isServer()) {
      this.img = new Image();
      switch (enemyType) {
        case EnemyType.ORDINARY:
          this.img.src = ordinarySrc;
          break;
        case EnemyType.WARRIOR:
          this.img.src = warriorSrc;
          break;
        default:
          throw new Error('Not impemented');
      }
      this.img.translate;
    }
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
