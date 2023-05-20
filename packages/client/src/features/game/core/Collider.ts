import { Size } from '../game-object/components/Graphics/Components';
import { GameObject } from '../game-object/components/Objects/GameObject';

export class Collider {
  constructor(private readonly gameObject: GameObject) {}

  public collideWith(other: GameObject): boolean {
    const difference = this.gameObject.position.substract(other.position);
    const absoluteDifX = Math.abs(difference.x);
    const absoluteDifY = Math.abs(difference.y);
    if (difference.x > 0) {
      // Обработка ситуации когда объект находится справа в момент соприкосновенияю. Деление внутри условий для того что бы снаряды визуально заходили в объект
      if (absoluteDifX < other.size.width / 2) {
        if (difference.y > 0) {
          // Обработка ситуации когда объект находится ниже в момент соприкосновения
          if (absoluteDifY < other.size.height / 4) {
            return true;
          }
        } else if (absoluteDifY < this.gameObject.size.height / 4) {
          // Обработка ситуации когда объект находится выше в момент соприкосновения
          return true;
        }
      }
    } else {
      // Обработка ситуации когда объект находится слева в момент соприкосновения. Деление внутри условий для того что бы снаряды визуально заходили в объект
      if (absoluteDifX < this.gameObject.size.width / 2) {
        if (difference.y > 0) {
          // Обработка ситуации когда объект находится ниже в момент соприкосновения
          if (absoluteDifY < other.size.height / 4) {
            return true;
          }
        } else if (absoluteDifY < other.size.height / 4) {
          // Обработка ситуации когда объект находится выше в момент соприкосновения
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
