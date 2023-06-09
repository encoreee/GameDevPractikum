import { Canvas } from '../core/Canvas';
import { KeyboardController } from '../core/KeyboardController';
import {
  SceneEnemyMetrics,
  SceneInterface,
  SceneReferenceMetrics,
  SceneTimeMetrics,
} from './SceneInterface';
import {
  SceneEnemyCreateConfigType,
  enemyConfig,
  playerConfig,
} from '../Config';
import { PlayerProfile } from '../scenes/SceneUtils/PlayerUtils';
import { GameObjectCollection } from '../utils/GameObjectCollection';
import { createPlayer, createPlayerLives } from './SceneUtils/PlayerUtils';
import { delay } from './SceneUtils/TimeUtils';
import {
  ExplosionObjectType,
  createExplosion,
  createLabel,
  createPlayerPoint,
} from './SceneUtils/SceneUtils';
import { Player } from '../game-object/components/Objects/Player';
import { ReferenceObject } from '../game-object/components/Objects/ReferenceObject';
import { Vector2 } from '../utils/Vector2';
import { ExplosionObject } from '../game-object/components/Objects/GameObject';
import Audio, { AUDIO_IDS } from '@/features/Audio';
import Stats from './Stats';

export class GameSceneBase implements SceneInterface {
  private readonly player: Player;
  private readonly playerBulletCollection = new GameObjectCollection();
  private readonly playerLivesCollection = new GameObjectCollection();
  private readonly playerPoints: ReferenceObject;
  private levelLabel?: ReferenceObject;

  private readonly explosionCollection =
    new GameObjectCollection<ExplosionObject>();

  // необходимо переопределить
  public referenceMetrics: SceneReferenceMetrics = {
    levelLabel: 'Base label',
  };

  public readonly enemyBulletCollection = new GameObjectCollection();
  public readonly enemyCollection = new GameObjectCollection();
  public timeMetrics: SceneTimeMetrics = {
    startDelay: 0,
    canStart: false,
    absoluteTime: 0,
    lastAttackCreateTime: 0,
    lastEnemyCreateTime: 0,
    lastEnemyKillTime: 0,
  };
  public enemyMetrics: SceneEnemyMetrics = {
    currentRow: 1,
    startX: 0,
    startY: 0,
    enemiesSquadCount: 0,
    enemiesWaveCount: 0,
    currentEnemiesWave: 0,
    enemiesKilled: 0,
  };

  constructor(
    private readonly keyboard: KeyboardController,
    private endGameCallback: () => void,
    private selectNextSceneCallBack: () => void,
    private readonly profile: PlayerProfile,
    public sceneEnemyConfig: SceneEnemyCreateConfigType
  ) {
    this.profile = profile;
    this.player = createPlayer(
      playerConfig,
      this.keyboard,
      this.playerBulletCollection
    );
    this.playerPoints = createPlayerPoint(this.profile);
    this.levelLabel = createLabel(this.referenceMetrics.levelLabel);
  }
  /**
   * Метод отвечающий за инициализацию начальных метрик уровня, таких как расположение врагов
   * @returns
   */
  protected metricsInit() {
    //К имплементированию в уровнях
    return;
  }

  /**
   * Метод создания врагов в процессе игры и определение логики их выстрелов
   * @returns
   */
  protected sceneEnemyAction() {
    //К имплементированию в уровнях
    return;
  }

  //Метод инициализации сцены, вызывается снаружи, не подледжит изменению
  public init(): void {
    this.metricsInit();

    createPlayerLives(
      this.playerLivesCollection,
      playerConfig,
      this.profile.lives
    );
    Audio.stopAll();
    Audio.play(AUDIO_IDS.gameTheme, { loop: true });
  }

  //Метод обновления сцены, вызывается снаружи, не подледжит изменению
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
      this.player.setShootAbility(true);
    }

    this.timeMetrics.absoluteTime = performance.now();
    this.sceneEnemyAction();

    this.enemyBulletCollection.forEachFromEnd((bullet, index) => {
      if (bullet.collideWithWall(Canvas.size())) {
        this.enemyBulletCollection.delete(index);
        this.enemyBulletCollection.stopIterate();
      }

      if (this.player.collideWith(bullet)) {
        if (this.profile.lives > 0) {
          this.profile.lives--;
          const exp = createExplosion(
            Vector2.copy(bullet.position),
            ExplosionObjectType.PLAYER,
            dt
          );
          this.explosionCollection.push(exp);
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
          this.explosionCollection.push(
            createExplosion(
              Vector2.copy(enemy.position),
              ExplosionObjectType.ENEMY,
              dt
            )
          );
          this.playerBulletCollection.delete(bulletIndex);
          this.enemyCollection.delete(enemyIndex);
          this.profile.points += enemyConfig.enemyPoints.defaultPointsValue;
          this.enemyMetrics.enemiesKilled++;
          Stats.incrementPlayerHit();
          Stats.updatePlayerScore(this.profile.points);
          this.playerPoints.update(dt, this.profile.points.toString());
        }
      });

      enemy.update(dt, this.timeMetrics.absoluteTime);
    });

    this.explosionCollection.forEachFromEnd((exp, index) => {
      if (exp.isFinished()) {
        this.explosionCollection.delete(index);
      }
    });

    if (
      this.enemyCollection.count() === 0 &&
      this.enemyMetrics.enemiesKilled === this.sceneEnemyConfig.numberEnemy
    ) {
      // обработка окончания сцены, сброс метрик
      if (
        this.enemyMetrics.enemiesWaveCount <
        this.sceneEnemyConfig.enemiesWaveCount - 1
      ) {
        this.enemyMetrics.enemiesSquadCount = 0;
        this.enemyMetrics.currentRow = 1;
        this.enemyMetrics.enemiesWaveCount++;
        this.enemyMetrics.enemiesKilled = 0;
        this.timeMetrics.lastEnemyKillTime = performance.now();
      } else {
        this.enemyBulletCollection.erase();
        this.playerBulletCollection.erase();
        this.selectNextSceneCallBack();
      }
    }
  }

  //Метод рендеринга сцены, вызывается снаружи, не подледжит изменению
  public render(dt: number): void {
    if (this.levelLabel) {
      this.levelLabel.render(dt);
    }
    this.explosionCollection.forEachFromEnd((exp) => {
      exp.render(dt);
    });
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
}
