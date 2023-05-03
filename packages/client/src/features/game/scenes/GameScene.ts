import { Canvas } from '../core/Canvas';
import { BulletPhysics } from '../game-object/components/BulletPhysics';
import { GameObjectGraphics } from '../game-object/components/GameObjectGraphics';
import { GameObjectPhysics } from '../game-object/components/GameObjectPhysics';
import { PlayerInput } from '../game-object/components/PlayerInput';
import { GameObject, Size } from '../game-object/GameObject';
import { Player } from '../game-object/Player';
import { KeyboardController } from '../core/KeyboardController';
import { GameObjectCollection } from '../utils/GameObjectCollection';
import { Vector2 } from '../utils/Vector2';
import { SceneInterface } from './SceneInterface';

export class GameScene implements SceneInterface {
  private readonly player: Player;
  private readonly playerBulletCollection = new GameObjectCollection();
  private readonly enemyCollection = new GameObjectCollection();

  constructor(private readonly keyboard: KeyboardController) {
    this.player = this.createPlayer({
      size: { width: 50, height: 50 },
      canvasSize: Canvas.size(),
      bulletSize: { width: 20, height: 20 },
      paddingBottom: 50,
      speed: 500,
    });
  }
  public init(): void {
    this.createEnemies({
      numberEnemy: 6,
      gap: 25,
      size: { width: 50, height: 50 },
      canvasSize: Canvas.size(),
      paddingTop: 50,
    });
  }

  public update(dt: number): void {
    this.player.update(dt);
    this.playerBulletCollection.forEachFromEnd((bullet, index) => {
      if (bullet.collideWithWall(Canvas.size())) {
        this.playerBulletCollection.delete(index);
      }
      bullet.update(dt);
    });
    this.enemyCollection.forEachFromEnd((enemy) => enemy.update(dt));
  }

  public render(dt: number): void {
    this.player.render(dt);
    this.playerBulletCollection.forEachFromEnd((bullet) => bullet.render(dt));
    this.enemyCollection.forEachFromEnd((enemy) => {
      enemy.render(dt);
    });
  }

  private createPlayer(config: {
    size: Size;
    canvasSize: Size;
    bulletSize: Size;
    paddingBottom: number;
    speed: number;
  }): Player {
    const position = new Vector2(
      config.canvasSize.width / 2 - config.size.width / 2,
      config.canvasSize.height - config.size.height - config.paddingBottom
    );
    let lastBulletCreateTime = performance.now();
    const bulletCreateDelay = 500;

    const fireCallback = (position: Vector2) => {
      const currentBulletCreateTime = performance.now();
      if (currentBulletCreateTime > lastBulletCreateTime + bulletCreateDelay) {
        const bullet = this.createPlayerBullet(position, config.bulletSize);
        this.playerBulletCollection.push(bullet);
        lastBulletCreateTime = currentBulletCreateTime;
      }
    };

    const input = new PlayerInput(
      this.keyboard.getAction(),
      config.speed,
      fireCallback
    );

    return new Player(
      position,
      config.size,
      input,
      new GameObjectPhysics(),
      new GameObjectGraphics()
    );
  }

  private createPlayerBullet(position: Vector2, size: Size): GameObject {
    return new GameObject(
      position.substract(new Vector2(-size.width / 2, 0)),
      size,
      new BulletPhysics(),
      new GameObjectGraphics()
    );
  }

  private createEnemies(config: {
    numberEnemy: number;
    gap: number;
    size: Size;
    canvasSize: Size;
    paddingTop: number;
  }): void {
    const startX =
      (config.canvasSize.width +
        config.size.width / 2 -
        config.size.width * config.numberEnemy -
        config.gap * config.numberEnemy -
        1) /
      2;
    const startY = config.paddingTop;

    for (let i = 0; i < config.numberEnemy; i++) {
      const enemyVector = new Vector2(
        startX + (config.size.width + config.gap) * i,
        startY
      );

      const enemy = new GameObject(
        enemyVector,
        config.size,
        new GameObjectPhysics(),
        new GameObjectGraphics()
      );

      this.enemyCollection.push(enemy);
    }
  }
}
