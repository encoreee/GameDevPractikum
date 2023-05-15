import { Canvas } from '../core/Canvas';
import {
  EnemyBulletPhysics,
  PlayerBulletPhysics,
} from '../game-object/components/BulletPhysics';
import { GameObjectGraphics } from '../game-object/components/GameObjectGraphics';
import { GameObjectPhysics } from '../game-object/components/GameObjectPhysics';
import { PlayerInput } from '../game-object/components/PlayerInput';
import {
  EnemyBulletObject,
  GameObject,
  SquadPositionedObject,
} from '../game-object/GameObject';
import { Player } from '../game-object/Player';
import { KeyboardController } from '../core/KeyboardController';
import { Vector2 } from '../utils/Vector2';
import { SceneInterface } from './SceneInterface';
import {
  EnemyCreateConfigType,
  PlayerCreateConfigType,
  enemyConfig,
  playerConfig,
} from '../Config';
import { WarriorEnemyObjectPhysics } from '../game-object/components/WarriorEnemyObjectPhysics';
import { getRandomInt } from '../utils/Math';
import { OrdinaryEnemyObjectPhysics } from '../game-object/components/OrdinaryEnemyObjectPhysics';
import { PlayerProfile } from '../GamePage';
import { Size } from '../game-object/components/Components';
import { ReferenceObjectCollection } from '../utils/ReferenceObjectCollection';
import { GameObjectCollection } from '../utils/GameObjectCollection';
import { ReferenceObject } from '../game-object/ReferenceObject';
import { ReferenceObjectAction } from '../game-object/components/ReferenceObjectAction';
import { ReferenceObjectGraphics } from '../game-object/components/ReferenceObjectGraphics';

export class GameScene implements SceneInterface {
  private readonly player: Player;
  private readonly playerBulletCollection = new GameObjectCollection();
  private readonly enemyBulletCollection = new GameObjectCollection();
  private readonly enemyCollection = new GameObjectCollection();
  private readonly playerPointCollection = new ReferenceObjectCollection();
  private readonly playerPoints: ReferenceObject;
  private canStart = false;
  private startDelay = 0;
  private currentRow = 1;
  private startX = 0;
  private startY = 0;
  private absoluteTime = 0;
  private lastAttackCreateTime = 0;
  private lastEnemyCreateTime = 0;
  private lastEnemyKillTime = 0;
  private enemiesSquadCount = 0;
  private enemiesWaveCount = 0;
  private currentEnemiesWave = 0;

  constructor(
    private readonly keyboard: KeyboardController,
    private endGameCallback: () => void,
    private selectNextSceneCallBack: () => void,
    private readonly profile: PlayerProfile
  ) {
    this.profile = profile;
    this.player = this.createPlayer(playerConfig);
    this.playerPoints = new ReferenceObject(
      this.profile.points.toString(),
      new Vector2(10, 30),
      new ReferenceObjectAction(),
      new ReferenceObjectGraphics()
    );
  }
  public init(): void {
    this.startX =
      (enemyConfig.canvasSize.width +
        enemyConfig.size.width / 2 -
        enemyConfig.size.width * enemyConfig.numberPerRow -
        enemyConfig.gap * enemyConfig.numberPerRow -
        1) /
      2;
    this.startY = enemyConfig.paddingTop;
    console.log('gameScene inited');
    this.startDelay = performance.now();
  }

  public update(dt: number): void {
    this.player.update(dt);
    if (!this.canStart) {
      this.delay(2000)(this.startDelay);
      return;
    }

    this.absoluteTime = performance.now();

    if (this.enemiesSquadCount < enemyConfig.numberEnemy) {
      this.tryCreateEnemy(this.enemiesSquadCount)(
        this.lastEnemyCreateTime,
        this.lastEnemyKillTime
      );
    }

    const selectEnemyToAttack = getRandomInt(this.enemyCollection.count());
    const enemyToAttack = this.enemyCollection.getObject(selectEnemyToAttack);
    if (enemyToAttack) {
      let bulletCreateDelay = enemyConfig.bulletCreateDelay;
      if (
        this.enemyCollection.count() <= enemyConfig.numberEnemy / 3 &&
        this.enemyCollection.count() > 1
      ) {
        bulletCreateDelay = bulletCreateDelay * 2;
      } else if (this.enemyCollection.count() === 1) {
        bulletCreateDelay = bulletCreateDelay * 2;
      }

      this.enemyFireAction(
        enemyToAttack,
        enemyConfig.bulletSize,
        bulletCreateDelay
      )(enemyToAttack.position, this.lastAttackCreateTime);
    }

    this.enemyBulletCollection.forEachFromEnd((bullet, index) => {
      if (bullet.collideWithWall(Canvas.size())) {
        this.enemyBulletCollection.delete(index);
      }

      if (this.player.collideWith(bullet)) {
        //this.endGameCallback();
      }

      bullet.update(dt, 0, this.player);
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
          this.playerPoints.text;
          this.playerBulletCollection.delete(bulletIndex);
          this.enemyCollection.delete(enemyIndex);

          this.profile.points += 100;
          this.playerPoints.update(dt, this.profile.points.toString());
          if (this.enemyCollection.count() === 0) {
            if (this.enemiesWaveCount < 2) {
              this.enemiesSquadCount = 0;
              this.currentRow = 1;
              this.enemiesWaveCount++;
              this.lastEnemyKillTime = performance.now();
            } else {
              this.selectNextSceneCallBack();
            }
          }
        }
      });

      enemy.update(dt, this.absoluteTime);
    });
  }

  public render(dt: number): void {
    this.playerPoints.render(dt);
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
        this.lastAttackCreateTime = currentBulletCreateTime;
      }
    };
  }

  public delay(delay: number) {
    return (timeCheck: number) => {
      const currentTime = performance.now();
      if (currentTime > timeCheck + delay) {
        this.canStart = true;
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
      return new EnemyBulletObject(
        position.add(
          new Vector2(objectSize.width / 2 - bulletSize.width / 2, 0)
        ),
        bulletSize,
        new EnemyBulletPhysics(),
        new GameObjectGraphics()
      );
    }
  }

  public tryCreateEnemy(index: number) {
    return (lastEnemyCreateTime: number, lastEnemyKillTime: number) => {
      const currentEnemyCreateTime = performance.now();
      const squadRow = Math.floor(index / enemyConfig.numberPerRow) + 1;
      if (this.enemiesWaveCount === this.currentEnemiesWave) {
        if (this.currentRow === squadRow) {
          if (
            currentEnemyCreateTime >
            lastEnemyCreateTime + enemyConfig.enemyCreateDelay
          ) {
            this.createEnemy(enemyConfig, this.startX, this.startY, 300, index);
            this.lastEnemyCreateTime = currentEnemyCreateTime;
            this.enemiesSquadCount++;
          }
        } else {
          if (
            currentEnemyCreateTime >
            lastEnemyCreateTime + enemyConfig.enemyRowCreateDelay
          ) {
            this.createEnemy(enemyConfig, this.startX, this.startY, 400, index);
            this.lastEnemyCreateTime = currentEnemyCreateTime;
            this.enemiesSquadCount++;
            this.currentRow = squadRow;
          }
        }
      } else {
        if (
          currentEnemyCreateTime >
          lastEnemyKillTime + enemyConfig.enemyWaveCreateDelay
        ) {
          this.createEnemy(enemyConfig, this.startX, this.startY, 300, index);
          this.lastEnemyCreateTime = currentEnemyCreateTime;
          this.enemiesSquadCount++;
          this.currentEnemiesWave = this.enemiesWaveCount;
        }
      }
    };
  }

  private createEnemy(
    config: EnemyCreateConfigType,
    xSquadPositionConst: number,
    ySquadPositionConst: number,
    movementRadius: number,
    enemyNumber: number
  ): void {
    {
      const squadRow = Math.floor(enemyNumber / config.numberPerRow) + 1;
      let enemyNumberRest = enemyNumber;
      while (!(enemyNumberRest < config.numberPerRow)) {
        enemyNumberRest -= config.numberPerRow;
      }
      const enemyVector = new Vector2(
        xSquadPositionConst +
          (config.size.width + config.gap) * enemyNumberRest,
        ySquadPositionConst * squadRow * 2
      );

      if (squadRow === 1) {
        const enemy = new SquadPositionedObject(
          new Vector2(0, enemyConfig.canvasSize.height / 8),
          config.size,
          0,
          movementRadius,
          enemyVector,
          new WarriorEnemyObjectPhysics(performance.now(), config),
          new GameObjectGraphics()
        );
        this.enemyCollection.push(enemy);
      } else if (squadRow === 2) {
        const enemy = new SquadPositionedObject(
          new Vector2(
            config.canvasSize.width,
            enemyConfig.canvasSize.height / 8
          ),
          config.size,
          0,
          movementRadius,
          enemyVector,
          new OrdinaryEnemyObjectPhysics(performance.now(), config),
          new GameObjectGraphics()
        );
        this.enemyCollection.push(enemy);
      } else if (squadRow === 3) {
        const enemy = new SquadPositionedObject(
          new Vector2(0, enemyConfig.canvasSize.height / 6),
          config.size,
          0,
          movementRadius,
          enemyVector,
          new WarriorEnemyObjectPhysics(performance.now(), config),
          new GameObjectGraphics()
        );
        this.enemyCollection.push(enemy);
      }
    }
  }
}
