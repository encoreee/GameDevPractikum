import { Canvas } from '../core/Canvas';
import { KeyboardController } from '../core/KeyboardController';
import {
  SceneEnemyMetrics,
  SceneInterface,
  SceneReferenceMetrics,
  SceneTimeMetrics,
} from './SceneInterface';
import { enemyConfig, playerConfig, canvasSize } from '../Config';
import { getRandomInt } from '../utils/Math';
import { PlayerProfile } from '../GamePage';
import { ReferenceObjectCollection } from '../utils/ReferenceObjectCollection';
import { GameObjectCollection } from '../utils/GameObjectCollection';
import { createPlayer, createPlayerLives } from './SceneUtils/PlayerUtils';
import { createEnemy, enemyFireAction } from './SceneUtils/EnemyUtils';
import { delay } from './SceneUtils/TimeUtils';
import { createLabel, createPlayerPoint } from './SceneUtils/SceneUtils';
import { Player } from '../game-object/components/Objects/Player';
import { ReferenceObject } from '../game-object/components/Objects/ReferenceObject';

export class GameSceneLevel1 implements SceneInterface {
  private readonly player: Player;
  private readonly playerBulletCollection = new GameObjectCollection();
  private readonly enemyBulletCollection = new GameObjectCollection();
  private readonly enemyCollection = new GameObjectCollection();
  private readonly playerPointCollection = new ReferenceObjectCollection();
  private readonly playerLivesCollection = new GameObjectCollection();
  private readonly playerPoints: ReferenceObject;
  private levelLabel?: ReferenceObject;
  private timeMetrics: SceneTimeMetrics = {
    startDelay: 0,
    canStart: false,
    absoluteTime: 0,
    lastAttackCreateTime: 0,
    lastEnemyCreateTime: 0,
    lastEnemyKillTime: 0,
  };
  private enemyMetrics: SceneEnemyMetrics = {
    currentRow: 0,
    startX: 0,
    startY: 0,
    enemiesSquadCount: 0,
    enemiesWaveCount: 0,
    currentEnemiesWave: 0,
  };

  private referenceMetrics: SceneReferenceMetrics = {
    levelLabel: 'Level 1',
  };

  constructor(
    private readonly keyboard: KeyboardController,
    private endGameCallback: () => void,
    private selectNextSceneCallBack: () => void,
    private readonly profile: PlayerProfile
  ) {
    this.profile = profile;
    this.player = createPlayer(
      playerConfig,
      this.keyboard,
      this.playerBulletCollection
    );
    this.playerPoints = createPlayerPoint(this.profile);
    this.levelLabel = createLabel(this.referenceMetrics.levelLabel, canvasSize);
  }
  public init(): void {
    this.enemyMetrics.startX =
      (enemyConfig.canvasSize.width +
        enemyConfig.size.width / 2 -
        enemyConfig.size.width * enemyConfig.numberPerRow -
        enemyConfig.gap * enemyConfig.numberPerRow -
        1) /
      2;
    this.enemyMetrics.startY = enemyConfig.paddingTop;
    this.timeMetrics.startDelay = performance.now();

    createPlayerLives(
      this.playerLivesCollection,
      playerConfig,
      this.profile.lives
    );
  }

  public update(dt: number): void {
    this.player.update(dt);
    if (this.levelLabel) {
      this.levelLabel.update(dt, this.referenceMetrics.levelLabel);
    }

    if (!this.timeMetrics.canStart) {
      delay(this.timeMetrics, 2000)(this.timeMetrics.startDelay);
      return;
    }

    if (this.timeMetrics.canStart && this.levelLabel) {
      this.levelLabel = undefined;
      this.player.setShutAbility(true);
    }

    this.timeMetrics.absoluteTime = performance.now();

    if (this.enemyMetrics.enemiesSquadCount < enemyConfig.numberEnemy) {
      this.tryCreateEnemy(this.enemyMetrics.enemiesSquadCount)(
        this.timeMetrics.lastEnemyCreateTime,
        this.timeMetrics.lastEnemyKillTime
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

      enemyFireAction(
        bulletCreateDelay,
        enemyConfig,
        this.timeMetrics,
        this.enemyBulletCollection
      )(enemyToAttack.position, this.timeMetrics.lastAttackCreateTime);
    }

    this.enemyBulletCollection.forEachFromEnd((bullet, index) => {
      if (bullet.collideWithWall(Canvas.size())) {
        this.enemyBulletCollection.delete(index);
        this.enemyBulletCollection.stopIterate();
      }

      if (this.player.collideWith(bullet)) {
        if (this.profile.lives > 0) {
          this.profile.lives--;
          this.enemyBulletCollection.delete(index);
          createPlayerLives(
            this.playerLivesCollection,
            playerConfig,
            this.profile.lives
          );

          this.enemyBulletCollection.stopIterate();
        } else {
          this.endGameCallback();
        }
      }

      bullet.update(dt, 0, this.player);
    });

    this.playerBulletCollection.forEachFromEnd((bullet, index) => {
      if (bullet.collideWithWall(Canvas.size())) {
        this.playerBulletCollection.delete(index);
        this.playerBulletCollection.stopIterate();
      }
      bullet.update(dt);
    });

    this.enemyCollection.forEachFromEnd((enemy, enemyIndex) => {
      this.playerBulletCollection.forEachFromEnd((bullet, bulletIndex) => {
        if (enemy.collideWith(bullet)) {
          this.playerBulletCollection.delete(bulletIndex);
          this.enemyCollection.delete(enemyIndex);

          this.profile.points += 100;
          this.playerPoints.update(dt, this.profile.points.toString());
          if (this.enemyCollection.count() === 0) {
            if (this.enemyMetrics.enemiesWaveCount < 2) {
              this.enemyMetrics.enemiesSquadCount = 0;
              this.enemyMetrics.currentRow = 1;
              this.enemyMetrics.enemiesWaveCount++;
              this.timeMetrics.lastEnemyKillTime = performance.now();
            } else {
              this.enemyBulletCollection.erase();
              this.playerBulletCollection.erase();
              this.selectNextSceneCallBack();
            }
          }
        }
      });

      enemy.update(dt, this.timeMetrics.absoluteTime);
    });
  }

  public render(dt: number): void {
    if (this.levelLabel) {
      this.levelLabel.render(dt);
    }
    this.playerPoints.render(dt);
    this.player.render(dt);
    this.playerBulletCollection.forEachFromEnd((bullet) => bullet.render(dt));
    this.enemyCollection.forEachFromEnd((enemy) => {
      enemy.render(dt);
    });
    this.enemyBulletCollection.forEachFromEnd((bullet) => {
      bullet.render(dt);
    });
    this.playerLivesCollection.forEachFromEnd((live) => {
      live.render(dt);
    });
  }

  public tryCreateEnemy(index: number) {
    return (lastEnemyCreateTime: number, lastEnemyKillTime: number) => {
      const currentEnemyCreateTime = performance.now();
      const squadRow = Math.floor(index / enemyConfig.numberPerRow) + 1;
      if (
        this.enemyMetrics.enemiesWaveCount ===
        this.enemyMetrics.currentEnemiesWave
      ) {
        if (this.enemyMetrics.currentRow === squadRow) {
          if (
            currentEnemyCreateTime >
            lastEnemyCreateTime + enemyConfig.enemyCreateDelay
          ) {
            createEnemy(
              this.enemyCollection,
              enemyConfig,
              this.enemyMetrics.startX,
              this.enemyMetrics.startY,
              300,
              index
            );
            this.timeMetrics.lastEnemyCreateTime = currentEnemyCreateTime;
            this.enemyMetrics.enemiesSquadCount++;
          }
        } else {
          if (
            currentEnemyCreateTime >
            lastEnemyCreateTime + enemyConfig.enemyRowCreateDelay
          ) {
            createEnemy(
              this.enemyCollection,
              enemyConfig,
              this.enemyMetrics.startX,
              this.enemyMetrics.startY,
              400,
              index
            );
            this.timeMetrics.lastEnemyCreateTime = currentEnemyCreateTime;
            this.enemyMetrics.enemiesSquadCount++;
            this.enemyMetrics.currentRow = squadRow;
          }
        }
      } else {
        if (
          currentEnemyCreateTime >
          lastEnemyKillTime + enemyConfig.enemyWaveCreateDelay
        ) {
          createEnemy(
            this.enemyCollection,
            enemyConfig,
            this.enemyMetrics.startX,
            this.enemyMetrics.startY,
            300,
            index
          );
          this.timeMetrics.lastEnemyCreateTime = currentEnemyCreateTime;
          this.enemyMetrics.enemiesSquadCount++;
          this.enemyMetrics.currentEnemiesWave =
            this.enemyMetrics.enemiesWaveCount;
        }
      }
    };
  }
}
