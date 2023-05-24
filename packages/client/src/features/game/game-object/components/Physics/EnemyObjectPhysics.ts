import { EnemyCreateConfigType } from '@/features/game/Config';
import { GameObjectComponent } from '../Graphics/Components';
import { SquadPositionedObject } from '../Objects/GameObject';
import { Vector2 } from '@/features/game/utils/Vector2';
import {
  CircleMovement,
  EnemyMovement,
  LinerMovement,
  Movement,
  MovementTypes,
  PI,
  instanceOfCircleMovement,
  instanceOfLinerMovement,
} from './EnemyPhysicsTypes';

export class EnemyObjectPhysics implements GameObjectComponent {
  private arrMovementIndex: number;
  private config: EnemyCreateConfigType;

  constructor(
    public absoluteTime: number,
    config: EnemyCreateConfigType,
    public enemyMovementArr: EnemyMovement[]
  ) {
    this.arrMovementIndex = 0;
    this.config = config;
  }

  private getCurrentMovement(
    index: number
  ): LinerMovement | CircleMovement | Movement | undefined {
    if (index < this.enemyMovementArr.length) {
      return this.enemyMovementArr[index];
    }
    return undefined;
  }

  /**
   * Измениение позиции врага в зависимости от его положения на экране.
   * Обновление позиции включает в себя последовательно мещающие друг друга состояния, исходя из массива движений,
   * в зависимости от достижения определенного положения на экране, и заканчивающиеся выходом на матрицу расположения.
   * При достижении позиции actionNumber меняет свое значение на следующее.
   * Траектория движения задается добавлением actionNumber с необходимым поведением.
   * @param gameObject
   * @param dt
   */

  public setNextIndex(gameObject: SquadPositionedObject): void {
    this.arrMovementIndex++;
    const movement = this.getCurrentMovement(this.arrMovementIndex);
    if (movement && instanceOfCircleMovement(movement)) {
      if (movement.direction === 'negative') {
        gameObject.currentAngle = -movement.startAngle;
        gameObject.endAngle =
          -movement.roundsCount * PI * 2 - movement.startAngle;
      } else {
        gameObject.currentAngle = movement.startAngle;
        gameObject.endAngle =
          movement.roundsCount * PI * 2 + movement.startAngle;
      }
    } else {
      gameObject.currentAngle = 0;
      gameObject.endAngle = 0;
    }
  }

  public update(gameObject: SquadPositionedObject, dt: number): void {
    // Вектор разницы по отношению к указанной позиции в матрице расположения
    const diffVectorSquadPosition = gameObject.squadPosition.substract(
      gameObject.position
    );

    //Преобразование в угловую меру, необходим для расчета кругового движения
    const angleVector = gameObject.position.fromPolar(
      gameObject.radius,
      gameObject.currentAngle
    );

    let moveToPositionX = 0;
    let moveToPositionY = 0;

    const movement = this.getCurrentMovement(this.arrMovementIndex);
    switch (movement?.type) {
      //Обработка линейного джижения
      case MovementTypes.LINEAR:
        if (instanceOfLinerMovement(movement)) {
          const diffVectorTargetPosition = movement.targetPosition
            .substract(gameObject.position)
            .normalizeToScalarValue(
              this.config.enemyPhisicsConfig.DEFAULT_SPEED
            );
          const distance = Vector2.distance(
            gameObject.position,
            movement.targetPosition
          );
          if (distance > this.config.enemyPhisicsConfig.DISTANCE_PRESICION) {
            gameObject.position = gameObject.position.add(
              diffVectorTargetPosition.multiply(dt)
            );
          } else {
            this.setNextIndex(gameObject);
          }
        }
        break;
      case MovementTypes.CIRCLE:
        //Обработка кругового джижения
        if (instanceOfCircleMovement(movement)) {
          gameObject.position = gameObject.position.add(
            angleVector.multiply(dt)
          );
          if (movement.direction === 'positive') {
            // Обработка движения по часовой стрелке
            if (
              Math.abs(gameObject.currentAngle) < Math.abs(gameObject.endAngle)
            ) {
              gameObject.currentAngle +=
                this.config.enemyPhisicsConfig.DEFAULT_ANGLE_INCREMENT;
            } else {
              this.setNextIndex(gameObject);
            }
          } else {
            // Обработка движения против часовой стрелке
            if (
              Math.abs(gameObject.currentAngle) < Math.abs(gameObject.endAngle)
            ) {
              gameObject.currentAngle -=
                this.config.enemyPhisicsConfig.DEFAULT_ANGLE_INCREMENT;
            } else {
              this.setNextIndex(gameObject);
            }
          }
        }
        break;

      case MovementTypes.RETURNING:
        // Выход на позицию в матрице расположения, по линейному закону
        // Обработка ситуация когда враг находится справа или слева от позиции
        if (diffVectorSquadPosition.x > 0) {
          if (
            diffVectorSquadPosition.x >
            this.config.enemyPhisicsConfig.POSITION_EXIT_SPEED_BARRIER
          ) {
            moveToPositionX =
              -this.config.enemyPhisicsConfig.DEFAULT_POSIOTION_EXIT_SPEED;
          } else {
            moveToPositionX = -diffVectorSquadPosition.x;
          }
        } else {
          if (
            diffVectorSquadPosition.x <
            this.config.enemyPhisicsConfig.POSITION_EXIT_SPEED_BARRIER
          ) {
            moveToPositionX =
              this.config.enemyPhisicsConfig.DEFAULT_POSIOTION_EXIT_SPEED;
          } else {
            moveToPositionX = diffVectorSquadPosition.x;
          }
        }
        // Обработка ситуация когда враг находится выше или ниже от позиции
        if (diffVectorSquadPosition.y > 0) {
          if (
            diffVectorSquadPosition.y >
            this.config.enemyPhisicsConfig.POSITION_EXIT_SPEED_BARRIER
          ) {
            moveToPositionY =
              -this.config.enemyPhisicsConfig.DEFAULT_POSIOTION_EXIT_SPEED;
          } else {
            moveToPositionY = -diffVectorSquadPosition.y;
          }
        } else {
          if (
            diffVectorSquadPosition.y <
            this.config.enemyPhisicsConfig.POSITION_EXIT_SPEED_BARRIER
          ) {
            moveToPositionY =
              this.config.enemyPhisicsConfig.DEFAULT_POSIOTION_EXIT_SPEED;
          } else {
            moveToPositionY = diffVectorSquadPosition.y;
          }
        }

        gameObject.position = gameObject.position.substract(
          new Vector2(moveToPositionX, moveToPositionY).multiply(dt)
        );
        break;

      case MovementTypes.STOP:
        // Оработка остановки
        break;

      default:
        throw new Error('Action not implemented.');
    }
  }
}
