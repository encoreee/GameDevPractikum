import { Canvas } from '../core/Canvas';
import {
  EnemyBulletPhysics,
  PlayerBulletPhysics,
} from '../game-object/components/BulletPhysics';
import { GameObjectGraphics } from '../game-object/components/GameObjectGraphics';
import { GameObjectPhysics } from '../game-object/components/GameObjectPhysics';
import { PlayerInput } from '../game-object/components/PlayerInput';
import {
  CircleMovementObject,
  GameObject,
  Size,
} from '../game-object/GameObject';
import { Player } from '../game-object/Player';
import { KeyboardController } from '../core/KeyboardController';
import { GameObjectCollection } from '../utils/GameObjectCollection';
import { Vector2 } from '../utils/Vector2';
import { SceneInterface } from './SceneInterface';
import { enemyConfig, playerConfig } from '../Config';
import { EnemyObjectPhysics } from '../game-object/components/EnemyObjectPhysics';
import { getRandomInt } from '../utils/Math';

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
  bulletSize: Size;
  bulletCreateDelay: number;
};

export class GameScene implements SceneInterface {
  private readonly player: Player;
  private readonly absoluteStartTime: number;
  private lastBulletCreateTime: number;
  private readonly playerBulletCollection = new GameObjectCollection();
  private readonly enemyBulletCollection = new GameObjectCollection();
  private readonly enemyCollection = new GameObjectCollection();

  constructor(
    private readonly keyboard: KeyboardController,
    private endGameCallback: () => void
  ) {
    this.player = this.createPlayer(playerConfig);
    this.absoluteStartTime = performance.now();
    this.lastBulletCreateTime = performance.now();
  }
  public init(): void {
    this.createEnemies(enemyConfig);
  }

  public update(dt: number): void {
    this.player.update(dt);

    const selectEnemyToAttack = getRandomInt(this.enemyCollection.count());
    const enemyToAttack = this.enemyCollection.getObject(selectEnemyToAttack);
    let bulletCreateDelay = enemyConfig.bulletCreateDelay;
    if (
      this.enemyCollection.count() <= enemyConfig.numberEnemy / 3 &&
      this.enemyCollection.count() > 1
    ) {
      bulletCreateDelay = bulletCreateDelay * 2;
    } else if (this.enemyCollection.count() === 1) {
      bulletCreateDelay = bulletCreateDelay * 3;
    }

    this.enemyFireAction(
      enemyToAttack,
      enemyConfig.bulletSize,
      bulletCreateDelay
    )(enemyToAttack.position, this.lastBulletCreateTime);

    this.enemyBulletCollection.forEachFromEnd((bullet, index) => {
      if (bullet.collideWithWall(Canvas.size())) {
        this.enemyBulletCollection.delete(index);
      }

      if (this.player.collideWith(bullet)) {
        this.endGameCallback();
      }

      bullet.update(dt);
    });

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
          if (this.enemyCollection.empty()) {
            this.createEnemies(enemyConfig);
          }
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
    this.enemyBulletCollection.forEachFromEnd((bullet) => {
      bullet.render(dt);
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
        const bullet = this.createBullet(
          position,
          bulletSize,
          this.player.size,
          true
        );
        this.playerBulletCollection.push(bullet);
        lastBulletCreateTime = currentBulletCreateTime;
      }
    };
  }

  public enemyFireAction(
    gameObject: GameObject,
    bulletSize: Size,
    bulletCreateDelay: number
  ) {
    return (position: Vector2, lastBulletCreateTime: number) => {
      const currentBulletCreateTime = performance.now();
      if (currentBulletCreateTime > lastBulletCreateTime + bulletCreateDelay) {
        const bullet = this.createBullet(
          position,
          bulletSize,
          gameObject.size,
          false
        );
        this.enemyBulletCollection.push(bullet);
        this.lastBulletCreateTime = currentBulletCreateTime;
      }
    };
  }

  private createBullet(
    position: Vector2,
    bulletSize: Size,
    objectSize: Size,
    player: boolean
  ): GameObject {
    if (player) {
      return new GameObject(
        position.add(
          new Vector2(objectSize.width / 2 - bulletSize.width / 2, 0)
        ),
        bulletSize,
        new PlayerBulletPhysics(),
        new GameObjectGraphics()
      );
    } else {
      return new GameObject(
        position.add(
          new Vector2(objectSize.width / 2 - bulletSize.width / 2, 0)
        ),
        bulletSize,
        new EnemyBulletPhysics(),
        new GameObjectGraphics()
      );
    }
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

      const enemy = new CircleMovementObject(
        enemyVector,
        config.size,
        0,
        200,
        new EnemyObjectPhysics(),
        new GameObjectGraphics()
      );

      this.enemyCollection.push(enemy);
    }
  }
}
