import { KeyboardController } from '../core/KeyboardController';
import { SceneInterface } from './SceneInterface';
import { SceneEnemyCreateConfigType, enemyConfig } from '../Config';
import { PlayerProfile } from '../GamePage';
import { GameSceneBase } from './GameSceneBase';
import { enemyFireAction, tryCreateEnemy } from './SceneUtils/EnemyUtils';
import { getRandomInt } from '../utils/Math';

export class SimpleSquadScene extends GameSceneBase implements SceneInterface {
  constructor(
    keyboard: KeyboardController,
    endGameCallback: () => void,
    selectNextSceneCallBack: () => void,
    profile: PlayerProfile,
    private sceneEnemyConfig: SceneEnemyCreateConfigType
  ) {
    super(keyboard, endGameCallback, selectNextSceneCallBack, profile);
    this.referenceMetrics.levelLabel = sceneEnemyConfig.levelLabel;
  }

  protected metricsInit() {
    this.enemyMetrics.startX =
      (enemyConfig.canvasSize.width +
        enemyConfig.size.width / 2 -
        enemyConfig.size.width * this.sceneEnemyConfig.numberPerRow -
        this.sceneEnemyConfig.gap * this.sceneEnemyConfig.numberPerRow -
        1) /
      2;
    this.enemyMetrics.startY = enemyConfig.paddingTop;
    this.timeMetrics.startDelay = performance.now();
  }

  protected sceneEnemyAction() {
    if (
      this.enemyMetrics.enemiesSquadCount < this.sceneEnemyConfig.numberEnemy
    ) {
      tryCreateEnemy(
        this.enemyMetrics.enemiesSquadCount,
        this.enemyMetrics,
        this.timeMetrics,
        this.enemyCollection,
        this.sceneEnemyConfig
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
