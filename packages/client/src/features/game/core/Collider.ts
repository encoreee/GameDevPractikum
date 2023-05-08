import { GameObject, Size } from '../game-object/GameObject';

export class Collider {
  constructor(private readonly gameObject: GameObject) {}

  /**
   * //TODO: GAM-27. Реализована одна из игровых механик, описанных в документе с логикой игры.
   *
   * Обработка коллизий объектов
   * @see https://linear.app/gamedevpracticum/issue/GAM-27/realizovana-odna-iz-igrovyh-mehanik-opisannyh-v-dokumente-s-logikoj
   */
  public collideWith(other: GameObject): boolean {
    const difference = this.gameObject.position.substract(other.position);
    const absoluteDifX = Math.abs(difference.x);
    const absoluteDifY = Math.abs(difference.y);
    if (difference.x > 0) {
      if (absoluteDifX < other.size.width) {
        if (difference.y > 0) {
          if (absoluteDifY < other.size.height) {
            return true;
          }
        } else if (absoluteDifY < this.gameObject.size.height) {
          return true;
        }
      }
    } else {
      if (absoluteDifX < this.gameObject.size.width) {
        if (difference.y > 0) {
          if (absoluteDifY < other.size.height) {
            return true;
          }
        } else if (absoluteDifY < other.size.height) {
          return true;
        }
      }
    }
    return false;
  }
  public collideWithWall(canvasSize: Size): boolean {
    return (
      this.gameObject.position.x < 0 ||
      this.gameObject.position.x + this.gameObject.size.width >
        canvasSize.width ||
      this.gameObject.position.y < 0 ||
      this.gameObject.position.y + this.gameObject.size.height >
        canvasSize.height
    );
  }
}
