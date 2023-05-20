import { EnemyCreateConfigType } from '@/features/game/Config';
import { GameObjectComponent } from '../Graphics/Components';
import { SquadPositionedObject } from '../Objects/GameObject';
import { Vector2 } from '@/features/game/utils/Vector2';

export class WarriorEnemyObjectPhysics implements GameObjectComponent {
  private actionNumber: number;
  private config: EnemyCreateConfigType;

  constructor(public absoluteTime: number, config: EnemyCreateConfigType) {
    this.actionNumber = 0;
    this.config = config;
  }

  /**
   * Измениение позиции врага в зависимости от его положения на экране.
   * Обновление позиции включает в себя последовательно мещающие друг друга состояния,
   * в зависимости от достижения определенного положения на экране, и заканчивающиеся выходом на матрицу расположения.
   * При достижении позиции actionNumber меняет свое значение на следующее.
   * Траектория движения задается добавлением actionNumber с необходимым поведением.
   * @param gameObject
   * @param dt
   */

  public update(gameObject: SquadPositionedObject, dt: number): void {
    // Вектор разницы по отношщению к указанной позиции в матрице расположения
    const diffVector = gameObject.squadPosition.substract(gameObject.position);
    //Преобразование в угловую меру, необходим для расчета кругового движения
    const angleVector = gameObject.position.fromPolar(
      gameObject.radius,
      gameObject.currentAngle
    );
    let moveToPositionX = 0;
    let moveToPositionY = 0;

    switch (this.actionNumber) {
      case 0:
        // Оработка линейного движения
        if (
          gameObject.position.x <
          this.config.canvasSize.width - this.config.canvasSize.width / 3
        ) {
          gameObject.position = gameObject.position.add(
            new Vector2(
              this.config.enemyPhisicsConfig.DEFAULT_X_SPEED,
              this.config.enemyPhisicsConfig.DEFAULT_Y_SPEED
            ).multiply(dt)
          );
        } else {
          this.actionNumber = 1;
        }
        break;
      case 1:
        // Оработка кругового движения
        if (gameObject.currentAngle < 3) {
          gameObject.position = gameObject.position.add(
            angleVector.multiply(dt)
          );

          gameObject.currentAngle +=
            this.config.enemyPhisicsConfig.DEFAULT_ANGLE_INCREMENT;
        } else {
          gameObject.currentAngle = 0;
          this.actionNumber = 2;
        }
        break;
      case 2:
        // Оработка линейного движения
        if (gameObject.position.x > this.config.canvasSize.width / 3) {
          gameObject.position = gameObject.position.add(
            new Vector2(
              -this.config.enemyPhisicsConfig.DEFAULT_X_SPEED,
              -this.config.enemyPhisicsConfig.DEFAULT_Y_SPEED
            ).multiply(dt)
          );
        } else {
          this.actionNumber = 3;
        }
        break;
      case 3:
        // Оработка кругового движения
        if (gameObject.currentAngle > -3) {
          gameObject.position = gameObject.position.substract(
            angleVector.multiply(dt)
          );

          gameObject.currentAngle -=
            this.config.enemyPhisicsConfig.DEFAULT_ANGLE_INCREMENT;
        } else {
          this.actionNumber = 4;
        }
        break;
      case 4:
        // Оработка линейного движения
        if (
          gameObject.position.y <
          this.config.canvasSize.height - this.config.canvasSize.height / 3
        ) {
          gameObject.position = gameObject.position.add(
            new Vector2(
              this.config.enemyPhisicsConfig.DEFAULT_Y_SPEED,
              this.config.enemyPhisicsConfig.DEFAULT_X_SPEED
            ).multiply(dt)
          );
        } else {
          this.actionNumber = 5;
        }
        break;
      case 5:
        // Оработка кругового движения
        if (gameObject.currentAngle > -5) {
          gameObject.position = gameObject.position.substract(
            angleVector.multiply(dt)
          );

          gameObject.currentAngle -= 0.1;
        } else {
          gameObject.currentAngle = 0;
          this.actionNumber = 6;
        }
        break;
      case 6:
        // Выход на позицию в матрице расположения, по линейному закону
        // Обработка ситуация когда враг находится справа или слева от позиции
        if (diffVector.x > 0) {
          if (
            diffVector.x >
            this.config.enemyPhisicsConfig.POSITION_EXIT_SPEED_BARRIER
          ) {
            moveToPositionX =
              -this.config.enemyPhisicsConfig.DEFAULT_POSIOTION_EXIT_SPEED;
          } else {
            moveToPositionX = -diffVector.x;
          }
        } else {
          if (
            diffVector.x <
            this.config.enemyPhisicsConfig.POSITION_EXIT_SPEED_BARRIER
          ) {
            moveToPositionX =
              this.config.enemyPhisicsConfig.DEFAULT_POSIOTION_EXIT_SPEED;
          } else {
            moveToPositionX = diffVector.x;
          }
        }

        // Обработка ситуация когда враг находится выше или ниже от позиции
        if (diffVector.y > 0) {
          if (
            diffVector.y >
            this.config.enemyPhisicsConfig.POSITION_EXIT_SPEED_BARRIER
          ) {
            moveToPositionY =
              -this.config.enemyPhisicsConfig.DEFAULT_POSIOTION_EXIT_SPEED;
          } else {
            moveToPositionY = -diffVector.y;
          }
        } else {
          if (
            diffVector.y <
            this.config.enemyPhisicsConfig.POSITION_EXIT_SPEED_BARRIER
          ) {
            moveToPositionY =
              this.config.enemyPhisicsConfig.DEFAULT_POSIOTION_EXIT_SPEED;
          } else {
            moveToPositionY = diffVector.y;
          }
        }

        gameObject.position = gameObject.position.substract(
          new Vector2(moveToPositionX, moveToPositionY).multiply(dt)
        );
        break;
      default:
        throw new Error('Action not implemented.');
    }
  }
}
