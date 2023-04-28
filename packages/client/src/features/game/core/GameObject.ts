import { ActionFlagType } from './KeyboardController';
import { Vector2 } from './Vector2';

export interface GameObject {
  position: Vector2;
  size: { width: number; height: number };
  update(dt: number): void;
  render(dt: number): void;
}

export interface GameObjectComponent {
  update(gameObject: GameObject, dt: number): void;
}

export interface GraphicComponent {
  render(gameObject: GameObject, dt: number): void;
}

export class Player implements GameObject {
  private readonly input: PlayerInput;
  private readonly physics: PlayerPhysics;
  private readonly graphics: PlayerGraphics;

  constructor(
    public position: Vector2,
    public size: { width: number; height: number },
    actionFlag: ActionFlagType,
    speed: number,
    fireCallback: () => void
  ) {
    this.input = new PlayerInput(actionFlag, speed, fireCallback);
    this.physics = new PlayerPhysics();
    this.graphics = new PlayerGraphics();
  }
  setCanvasContext(context: CanvasRenderingContext2D) {
    this.graphics.setContext(context);
  }

  update(dt: number): void {
    this.input.update(this, dt);
    this.physics.update(this, dt);
  }
  render(dt: number): void {
    this.graphics.render(this, dt);
  }
}

class PlayerInput implements GameObjectComponent {
  private velocity: Vector2 = new Vector2(0, 0);

  constructor(
    private actionFlag: ActionFlagType,
    private speed: number,
    private fireCallback: () => void
  ) {}

  update(gameObject: GameObject, dt: number): void {
    if (this.actionFlag.LEFT) {
      this.velocity = new Vector2(-this.speed, 0);
    } else if (this.actionFlag.RIGHT) {
      this.velocity = new Vector2(this.speed, 0);
    } else {
      this.velocity = new Vector2(0, 0);
    }

    if (this.velocity.x !== 0) {
      gameObject.position = gameObject.position.add(this.velocity.multiply(dt));
    }

    if (this.actionFlag.FIRE) {
      this.fireCallback();
    }
  }
}

class PlayerPhysics implements GameObjectComponent {
  update(gameObject: GameObject, dt: number): void {
    return;
  }
}

class PlayerGraphics implements GraphicComponent {
  constructor(private context?: CanvasRenderingContext2D) {}
  public setContext(context: CanvasRenderingContext2D) {
    this.context = context;
  }
  render(gameObject: GameObject, dt: number): void {
    if (this.context) {
      this.context.fillStyle = 'green';
      this.context.fillRect(
        gameObject.position.x,
        gameObject.position.y,
        gameObject.size.width,
        gameObject.size.height
      );
    }
  }
}

export class Enemy implements GameObject {
  private physics: EnemyPhysics;
  private graphics: EnemyGraphics;

  constructor(
    public position: Vector2,
    public size: { width: number; height: number }
  ) {
    this.physics = new EnemyPhysics();
    this.graphics = new EnemyGraphics();
  }

  setCanvasContext(context: CanvasRenderingContext2D) {
    this.graphics.setContext(context);
  }

  update(dt: number): void {
    this.physics.update(this, dt);
  }
  render(dt: number): void {
    this.graphics.render(this, dt);
  }
}

class EnemyPhysics implements GameObjectComponent {
  public update(gameObject: GameObject, dt: number): void {
    return;
  }
}

class EnemyGraphics implements GraphicComponent {
  constructor(private context?: CanvasRenderingContext2D) {}
  public setContext(context: CanvasRenderingContext2D) {
    this.context = context;
  }
  public render(gameObject: GameObject, dt: number): void {
    if (this.context) {
      this.context.fillStyle = 'red';
      this.context.fillRect(
        gameObject.position.x,
        gameObject.position.y,
        gameObject.size.width,
        gameObject.size.height
      );
    }
  }
}
