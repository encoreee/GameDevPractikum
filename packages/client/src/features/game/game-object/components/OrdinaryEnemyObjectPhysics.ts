import { EnemyCreateConfigType } from '../../scenes/GameScene';
import { Vector2 } from '../../utils/Vector2';
import { GameObjectComponent, SquadPositionedObject } from '../GameObject';

export class OrdinaryEnemyObjectPhysics implements GameObjectComponent {
  private actionNumber: number;
  private config: EnemyCreateConfigType;

  constructor(public absoluteTime: number, config: EnemyCreateConfigType) {
    this.actionNumber = 0;
    this.config = config;
  }

  public update(gameObject: SquadPositionedObject, dt: number): void {
    if (this.actionNumber === 0) {
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
    } else if (this.actionNumber === 1) {
      if (gameObject.currentAngle > 0) {
        const vx = Math.cos(gameObject.currentAngle) * gameObject.radius;
        const vy = Math.sin(gameObject.currentAngle) * gameObject.radius;

        gameObject.position = gameObject.position.add(
          new Vector2(vx, vy).multiply(dt)
        );
        gameObject.currentAngle -= 0.1;
      } else {
        gameObject.currentAngle = 0;
        this.actionNumber = 2;
      }
    } else if (this.actionNumber === 2) {
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
    } else if (this.actionNumber === 3) {
      if (gameObject.currentAngle < 3) {
        const vx = Math.cos(gameObject.currentAngle) * gameObject.radius;
        const vy = Math.sin(gameObject.currentAngle) * gameObject.radius;

        gameObject.position = gameObject.position.add(
          new Vector2(vx, vy).multiply(dt)
        );
        gameObject.currentAngle += 0.1;
      } else {
        gameObject.currentAngle = 0;
        this.actionNumber = 4;
      }
    } else if (this.actionNumber === 4) {
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
    } else if (this.actionNumber === 5) {
      if (gameObject.currentAngle > -2) {
        const vx = Math.cos(gameObject.currentAngle) * gameObject.radius;
        const vy = Math.sin(gameObject.currentAngle) * gameObject.radius;

        gameObject.position = gameObject.position.add(
          new Vector2(vx, vy).multiply(dt)
        );
        gameObject.currentAngle -= 0.1;
      } else {
        gameObject.currentAngle = 0;
        this.actionNumber = 6;
      }
    } else if (this.actionNumber === 6) {
      const diffVector = gameObject.squadPosition.substract(
        gameObject.position
      );
      let moveToPositionX = 0;
      let moveToPositionY = 0;
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
    }
  }
}
