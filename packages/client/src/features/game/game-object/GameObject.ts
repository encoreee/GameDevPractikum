import { Collider } from '../core/Collider';
import { Vector2 } from '../utils/Vector2';
import {
  GameObjectComponent,
  GraphicComponent,
  Size,
} from './components/Components';

export class GameObject {
  private readonly collider: Collider;
  constructor(
    public position: Vector2,
    public readonly size: Size,
    protected readonly physics: GameObjectComponent,
    protected readonly graphics: GraphicComponent
  ) {
    this.collider = new Collider(this);
  }

  public update(dt: number, absTime?: number, refObject?: GameObject): void {
    this.physics.update(this, dt, absTime, refObject);
  }

  public render(dt: number): void {
    this.graphics.render(this, dt);
  }

  public collideWith(other: GameObject): boolean {
    return this.collider.collideWith(other);
  }
  public collideWithWall(canvasSize: Size): boolean {
    return this.collider.collideWithWall(canvasSize);
  }
}

export class EnemyBulletObject extends GameObject {
  public shuted = false;
  public defaultAttackDirection = new Vector2(0, 250);
  constructor(
    public position: Vector2,
    public readonly size: Size,
    protected readonly physics: GameObjectComponent,
    protected readonly graphics: GraphicComponent
  ) {
    super(position, size, physics, graphics);
  }
}

export class CircleMovementObject extends GameObject {
  constructor(
    public position: Vector2,
    public readonly size: Size,
    public currentAngle: number,
    public radius: number,
    protected readonly physics: GameObjectComponent,
    protected readonly graphics: GraphicComponent
  ) {
    super(position, size, physics, graphics);
    this.currentAngle = currentAngle;
    this.radius = radius;
  }
}

export class SquadPositionedObject extends CircleMovementObject {
  constructor(
    public position: Vector2,
    public readonly size: Size,
    public currentAngle: number,
    public radius: number,
    public squadPosition: Vector2,
    protected readonly physics: GameObjectComponent,
    protected readonly graphics: GraphicComponent
  ) {
    super(position, size, currentAngle, radius, physics, graphics);
    this.squadPosition = squadPosition;
  }
}
