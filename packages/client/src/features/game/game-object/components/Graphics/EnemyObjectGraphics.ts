import { Canvas } from '../../../core/Canvas';
import { GameObject } from '../Objects/GameObject';
import { GraphicComponent } from './Components';
import { random } from 'lodash';
import { ordinaryEnemies, warriorEnemies } from './EnemiesPacks';

export enum EnemyType {
  ORDINARY,
  WARRIOR,
}

export class EnemyObjectGraphics implements GraphicComponent {
  private readonly canvas = Canvas;
  private img: HTMLImageElement | undefined;
  constructor(enemyType: EnemyType) {
    this.img = new Image();
    switch (enemyType) {
      case EnemyType.ORDINARY:
        this.img.src = ordinaryEnemies[random(0, ordinaryEnemies.length - 1)];
        break;
      case EnemyType.WARRIOR:
        this.img.src = warriorEnemies[random(0, warriorEnemies.length - 1)];
        break;
      default:
        throw new Error('Not impemented');
    }
    this.img.translate;
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
