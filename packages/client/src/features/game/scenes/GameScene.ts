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

type PlayerCreateConfig = {
  size: Size;
  canvasSize: Size;
  bulletSize: Size;
  bulletCreateDelay: number;
  paddingBottom: number;
  speed: number;
};

type EnemyCreateConfig = {
  numberEnemy: number;
  gap: number;
  size: Size;
  canvasSize: Size;
  paddingTop: number;
};

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
      bulletCreateDelay: 300,
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

  private createPlayer(config: PlayerCreateConfig): Player {
    const position = new Vector2(
      config.canvasSize.width / 2 - config.size.width / 2,
      config.canvasSize.height - config.size.height - config.paddingBottom
    );

    const fireCallback = this.fireAction(
      config.bulletSize,
      config.bulletCreateDelay
    );
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

  /**
   * @returns `fireCallback` a function that should be called on each fire action
   */
  public fireAction(bulletSize: Size, bulletCreateDelay: number) {
    let lastBulletCreateTime = 0;

    return (position: Vector2) => {
      const currentBulletCreateTime = performance.now();
      if (currentBulletCreateTime > lastBulletCreateTime + bulletCreateDelay) {
        const bullet = this.createPlayerBullet(position, bulletSize);
        this.playerBulletCollection.push(bullet);
        lastBulletCreateTime = currentBulletCreateTime;
      }
    };
  }

  private createPlayerBullet(position: Vector2, size: Size): GameObject {
    return new GameObject(
      position.substract(new Vector2(-size.width / 2, 0)),
      size,
      new BulletPhysics(),
      new GameObjectGraphics()
    );
  }

  private createEnemies(config: EnemyCreateConfig): void {
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
