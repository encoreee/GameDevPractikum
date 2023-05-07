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
import { enemyConfig, playerConfig } from '../Config';

export type PlayerCreateConfigType = {
  size: Size;
  canvasSize: Size;
  bulletSize: Size;
  bulletCreateDelay: number;
  paddingBottom: number;
  speed: number;
};

export type EnemyCreateConfigType = {
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
    this.player = this.createPlayer(playerConfig);
  }
  public init(): void {
    this.createEnemies(enemyConfig);
  }

  public update(dt: number): void {
    this.player.update(dt);
    this.playerBulletCollection.forEachFromEnd((bullet, index) => {
      if (bullet.collideWithWall(Canvas.size())) {
        this.playerBulletCollection.delete(index);
      }
      bullet.update(dt);
    });
    this.enemyCollection.forEachFromEnd((enemy, enemyIndex) => {
      this.playerBulletCollection.forEachFromEnd((bullet, bulletIndex) => {
        if (enemy.collideWith(bullet)) {
          this.playerBulletCollection.delete(bulletIndex);
          this.enemyCollection.delete(enemyIndex);
        }
      });
      enemy.update(dt);
    });
  }

  public render(dt: number): void {
    this.player.render(dt);
    this.playerBulletCollection.forEachFromEnd((bullet) => bullet.render(dt));
    this.enemyCollection.forEachFromEnd((enemy) => {
      enemy.render(dt);
    });
  }

  private createPlayer(config: PlayerCreateConfigType): Player {
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
        const bullet = this.createPlayerBullet(
          position,
          bulletSize,
          this.player.size
        );
        this.playerBulletCollection.push(bullet);
        lastBulletCreateTime = currentBulletCreateTime;
      }
    };
  }

  private createPlayerBullet(
    position: Vector2,
    bulletSize: Size,
    playerSize: Size
  ): GameObject {
    return new GameObject(
      position.add(new Vector2(playerSize.width / 2 - bulletSize.width / 2, 0)),
      bulletSize,
      new BulletPhysics(),
      new GameObjectGraphics()
    );
  }

  private createEnemies(config: EnemyCreateConfigType): void {
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
