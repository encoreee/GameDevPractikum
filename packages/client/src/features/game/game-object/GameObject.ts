import { Collider } from '../core/Collider';
import { Vector2 } from '../utils/Vector2';

export interface GameObjectComponent {
  update(gameObject: GameObject, dt: number): void;
}

export interface GraphicComponent {
  render(gameObject: GameObject, dt: number): void;
}

export type Size = {
  width: number;
  height: number;
};

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

  public update(dt: number): void {
    this.physics.update(this, dt);
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
