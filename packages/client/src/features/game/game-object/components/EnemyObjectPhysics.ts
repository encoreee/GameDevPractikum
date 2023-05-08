import { config } from 'dotenv';
import { EnemyCreateConfigType } from '../../scenes/GameScene';
import { Vector2 } from '../../utils/Vector2';
import { GameObjectComponent, SquadPositionedObject } from '../GameObject';
const timeLabels: number[] = [2000, 4000, 6000, 8000];

export class EnemyObjectPhysics implements GameObjectComponent {
  private objectTimeLabels: number[];
  private actionNumber: number;
  private config: EnemyCreateConfigType;

  constructor(public absoluteTime: number, config: EnemyCreateConfigType) {
    this.objectTimeLabels = [];
    this.actionNumber = 0;
    this.config = config;
    timeLabels.forEach((label) =>
      this.objectTimeLabels.push(absoluteTime + label)
    );
  }

  public update(
    gameObject: SquadPositionedObject,
    dt: number,
    absTime?: number
  ): void {
    if (this.actionNumber === 0) {
      if (
        gameObject.position.x <
        this.config.canvasSize.width - this.config.canvasSize.width / 3
      ) {
        gameObject.position = gameObject.position.add(
          new Vector2(400, 100).multiply(dt)
        );
      } else {
        this.actionNumber = 1;
      }
    } else if (this.actionNumber === 1) {
      if (gameObject.currentAngle < 3) {
        const vx = Math.cos(gameObject.currentAngle) * gameObject.radius;
        const vy = Math.sin(gameObject.currentAngle) * gameObject.radius;

        gameObject.position = gameObject.position.add(
          new Vector2(vx, vy).multiply(dt)
        );

        gameObject.currentAngle += 0.1;
      } else {
        gameObject.currentAngle = 0;
        this.actionNumber = 2;
      }
    } else if (this.actionNumber === 2) {
      if (gameObject.position.x > this.config.canvasSize.width / 3) {
        gameObject.position = gameObject.position.add(
          new Vector2(-400, -100).multiply(dt)
        );
      } else {
        this.actionNumber = 3;
      }
    } else if (this.actionNumber === 3) {
      if (gameObject.currentAngle > -3) {
        const vx = Math.cos(gameObject.currentAngle) * gameObject.radius;
        const vy = Math.sin(gameObject.currentAngle) * gameObject.radius;

        gameObject.position = gameObject.position.substract(
          new Vector2(vx, vy).multiply(dt)
        );

        gameObject.currentAngle -= 0.1;
      } else {
        this.actionNumber = 4;
      }
    } else if (this.actionNumber === 4) {
      if (
        gameObject.position.y <
        this.config.canvasSize.height - this.config.canvasSize.height / 3
      ) {
        gameObject.position = gameObject.position.add(
          new Vector2(100, 400).multiply(dt)
        );
      } else {
        this.actionNumber = 5;
      }
    } else if (this.actionNumber === 5) {
      if (gameObject.currentAngle > -5) {
        const vx = Math.cos(gameObject.currentAngle) * 400;
        const vy = Math.sin(gameObject.currentAngle) * 400;

        gameObject.position = gameObject.position.substract(
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
