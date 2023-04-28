import { GameLoop } from './GameLoop';
import { Enemy, Player } from './GameObject';
import { KeyboardController } from './KeyboardController';
import { Vector2 } from './Vector2';

export class GalagaGame {
  public readonly keyboard: KeyboardController;
  private readonly gameloop: GameLoop;
  private readonly player: Player;
  private canvas?: HTMLCanvasElement;
  private context?: CanvasRenderingContext2D;
  private enemyCollection: Enemy[] = [];
  private bulletCollection: Enemy[] = [];

  constructor(private width: number, private height: number) {
    this.keyboard = new KeyboardController();
    this.player = new Player(
      new Vector2(width / 2 - 25, height - 75),
      { width: 50, height: 50 },
      this.keyboard.getAction(),
      500,
      this.fireCallback.bind(this)
    );
    this.gameloop = new GameLoop(
      this.update.bind(this),
      this.render.bind(this)
    );
    this.enemyInit();
    this.gameloop.start();
  }

  public setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = this.canvas.getContext('2d');
    if (context) {
      this.context = context;
      this.player.setCanvasContext(context);
      this.enemyCollection.forEach((gameObject) =>
        gameObject.setCanvasContext(context)
      );
      this.bulletCollection.forEach((gameObject) => {
        console.log(context);
        gameObject.setCanvasContext(context);
      });
    }
  }

  public enemyInit() {
    const numberEnemy = 6;
    const gap = 25;
    const enemySize = {
      width: 50,
      height: 50,
    };
    const startX =
      (this.width +
        enemySize.width / 2 -
        enemySize.width * numberEnemy -
        gap * numberEnemy -
        1) /
      2;
    const startY = 50;
    for (let i = 0; i < numberEnemy; i++) {
      const enemyVector = new Vector2(
        startX + (enemySize.width + gap) * i,
        startY
      );

      this.enemyCollection.push(new Enemy(enemyVector, enemySize));
    }
  }

  public fireCallback() {
    console.log('fire');
  }

  public update(dt: number) {
    this.player.update(dt);
  }

  public render(dt: number) {
    if (this.canvas && this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.player.render(dt);
    this.enemyCollection.forEach((gameObject) => gameObject.render(dt));
  }
}
