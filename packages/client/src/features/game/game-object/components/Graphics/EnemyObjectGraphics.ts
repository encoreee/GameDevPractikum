import { Canvas } from '../../../core/Canvas';
import { GameObject } from '../Objects/GameObject';
import { GraphicComponent } from './Components';
import ordinarySrc from '../../../../../assets/enemies/ordinaryEnemy.svg';
import warriorSrc from '../../../../../assets/enemies/warriorEnemy.svg';

export enum EnemyType {
  ORDINARY,
  WARRIOR,
}

export class EnemyObjectGraphics implements GraphicComponent {
  private readonly canvas = Canvas;
  private img: HTMLImageElement;
  constructor(enemyType: EnemyType) {
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
