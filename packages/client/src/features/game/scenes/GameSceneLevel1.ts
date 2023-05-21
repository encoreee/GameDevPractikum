import { KeyboardController } from '../core/KeyboardController';
import { SceneInterface, SceneReferenceMetrics } from './SceneInterface';
import { enemyConfig } from '../Config';
import { PlayerProfile } from '../GamePage';
import { GameSceneBase } from './GameSceneBase';
import { enemyFireAction, tryCreateEnemy } from './SceneUtils/EnemyUtils';
import { getRandomInt } from '../utils/Math';

export class GameSceneLevel1 extends GameSceneBase implements SceneInterface {
  public referenceMetrics: SceneReferenceMetrics = {
    levelLabel: 'Level 1',
  };
  constructor(
    keyboard: KeyboardController,
    endGameCallback: () => void,
    selectNextSceneCallBack: () => void,
    profile: PlayerProfile
  ) {
    super(keyboard, endGameCallback, selectNextSceneCallBack, profile);
  }

  protected metricsInit() {
    this.enemyMetrics.startX =
      (enemyConfig.canvasSize.width +
        enemyConfig.size.width / 2 -
        enemyConfig.size.width * enemyConfig.numberPerRow -
        enemyConfig.gap * enemyConfig.numberPerRow -
        1) /
      2;
    this.enemyMetrics.startY = enemyConfig.paddingTop;
    this.timeMetrics.startDelay = performance.now();
  }

  protected sceneEnemyAction() {
    if (this.enemyMetrics.enemiesSquadCount < enemyConfig.numberEnemy) {
      tryCreateEnemy(
        this.enemyMetrics.enemiesSquadCount,
        this.enemyMetrics,
        this.timeMetrics,
        this.enemyCollection
      )(
        this.timeMetrics.lastEnemyCreateTime,
        this.timeMetrics.lastEnemyKillTime
      );
    }

    const selectEnemyToAttack = getRandomInt(this.enemyCollection.count());
    const enemyToAttack = this.enemyCollection.getObject(selectEnemyToAttack);
    if (enemyToAttack) {
      enemyFireAction(
        enemyConfig,
        this.timeMetrics,
        this.enemyBulletCollection
      )(enemyToAttack, this.timeMetrics.lastAttackCreateTime);
    }
  }
}
