import { EnemyCreateConfigType } from '@/features/game/Config';
import { GameObjectComponent } from '../Graphics/Components';
import { SquadPositionedObject } from '../Objects/GameObject';
import { Vector2 } from '@/features/game/utils/Vector2';

export class OrdinaryEnemyObjectPhysics implements GameObjectComponent {
  private actionNumber: number;
  private config: EnemyCreateConfigType;

  constructor(public absoluteTime: number, config: EnemyCreateConfigType) {
    this.actionNumber = 0;
    this.config = config;
  }

  public update(gameObject: SquadPositionedObject, dt: number): void {
    const diffVector = gameObject.squadPosition.substract(gameObject.position);
    const angleVector = gameObject.position.fromPolar(
      gameObject.radius,
      gameObject.currentAngle
    );

    let moveToPositionX = 0;
    let moveToPositionY = 0;

    switch (this.actionNumber) {
      case 0:
        if (
          gameObject.position.x >
          this.config.canvasSize.width - (this.config.canvasSize.width / 4) * 3
        ) {
          gameObject.position = gameObject.position.add(
            new Vector2(-400, 100).multiply(dt)
          );
        } else {
          gameObject.currentAngle = 1.5;
          this.actionNumber = 1;
        }
        break;
      case 1:
        if (gameObject.currentAngle > 0) {
          gameObject.position = gameObject.position.add(
            angleVector.multiply(dt)
          );
          gameObject.currentAngle -= 0.1;
        } else {
          gameObject.currentAngle = 0;
          this.actionNumber = 2;
        }
        break;
      case 2:
        if (
          gameObject.position.x <
          this.config.canvasSize.width - this.config.canvasSize.width / 5
        ) {
          gameObject.position = gameObject.position.add(
            new Vector2(400, 100).multiply(dt)
          );
        } else {
          gameObject.currentAngle = 0;
          this.actionNumber = 3;
        }
        break;
      case 3:
        if (gameObject.currentAngle < 3) {
          gameObject.position = gameObject.position.add(
            angleVector.multiply(dt)
          );
          gameObject.currentAngle += 0.1;
        } else {
          gameObject.currentAngle = 0;
          this.actionNumber = 4;
        }
        break;
      case 4:
        if (
          gameObject.position.x >
          this.config.canvasSize.width - (this.config.canvasSize.width / 5) * 4
        ) {
          gameObject.position = gameObject.position.add(
            new Vector2(-400, 100).multiply(dt)
          );
        } else {
          gameObject.currentAngle = 3;
          this.actionNumber = 5;
        }
        break;
      case 5:
        if (gameObject.currentAngle > -2) {
          gameObject.position = gameObject.position.add(
            angleVector.multiply(dt)
          );
          gameObject.currentAngle -= 0.1;
        } else {
          gameObject.currentAngle = 0;
          this.actionNumber = 6;
        }
        break;
      case 6:
        if (diffVector.x > 0) {
          if (diffVector.x > 250) {
            moveToPositionX = -200;
          } else {
            moveToPositionX = -diffVector.x;
          }
        } else {
          if (diffVector.x < 250) {
            moveToPositionX = 200;
          } else {
            moveToPositionX = diffVector.x;
          }
        }

        if (diffVector.y > 0) {
          if (diffVector.y > 250) {
            moveToPositionY = -200;
          } else {
            moveToPositionY = -diffVector.y;
          }
        } else {
          if (diffVector.y < 250) {
            moveToPositionY = 200;
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
