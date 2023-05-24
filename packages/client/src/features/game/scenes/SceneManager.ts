import { KeyboardController } from '../core/KeyboardController';
import { SimpleSquadScene } from './SimpleSquadScene';
import { SceneInterface } from './SceneInterface';
import { SceneEnemyCreateConfigType } from '../Config';
import { PlayerProfile } from './SceneUtils/PlayerUtils';

export enum SceneName {
  LEVEL1 = 'level1',
  LEVEL2 = 'level2',
  LEVEL3 = 'level3',
  LEVEL4 = 'level4',
}

const sceneCollection: SceneEnemyCreateConfigType[] = [
  {
    numberPerRow: 1,
    numberEnemy: 3,
    gap: 50,
    enemyShotDeceleration: 3,
    enemiesWaveCount: 1,
    levelLabel: 'Level 1',
    ENEMY_CREATE_DELAY: 5000,
    ENEMY_ROW_CREATE_DELAY: 10000,
    ENEMY_WAVE_CREATE_DELAY: 20000,
    BULLET_CREATE_DELAY: 2000,
  },
  {
    numberPerRow: 3,
    numberEnemy: 9,
    gap: 30,
    enemyShotDeceleration: 2.5,
    enemiesWaveCount: 2,
    levelLabel: 'Level 2',
    ENEMY_CREATE_DELAY: 800,
    ENEMY_ROW_CREATE_DELAY: 10000,
    ENEMY_WAVE_CREATE_DELAY: 20000,
    BULLET_CREATE_DELAY: 1500,
  },
  {
    numberPerRow: 5,
    numberEnemy: 15,
    gap: 15,
    enemyShotDeceleration: 2,
    enemiesWaveCount: 3,
    levelLabel: 'Level 3',
    ENEMY_CREATE_DELAY: 800,
    ENEMY_ROW_CREATE_DELAY: 1500,
    ENEMY_WAVE_CREATE_DELAY: 3000,
    BULLET_CREATE_DELAY: 1500,
  },
  {
    numberPerRow: 6,
    numberEnemy: 18,
    gap: 15,
    enemyShotDeceleration: 2,
    enemiesWaveCount: 3,
    levelLabel: 'Level 4',
    ENEMY_CREATE_DELAY: 800,
    ENEMY_ROW_CREATE_DELAY: 1500,
    ENEMY_WAVE_CREATE_DELAY: 3000,
    BULLET_CREATE_DELAY: 800,
  },
];

type ScenesCollectionType = Record<
  SceneName,
  new (
    keyboard: KeyboardController,
    endGameCallback: () => void,
    selectNextSceneCallBack: () => void,
    profile: PlayerProfile,
    sceneEnemyConfig: SceneEnemyCreateConfigType
  ) => SceneInterface
>;

export class SceneManager {
  private static currentScene: SceneInterface;
  private static keyboard: KeyboardController;
  private static scenesCollection: ScenesCollectionType = {
    level1: SimpleSquadScene,
    level2: SimpleSquadScene,
    level3: SimpleSquadScene,
    level4: SimpleSquadScene,
  };

  private static sceneOrder: SceneName[] = Object.values(SceneName);
  private static end: boolean;
  private static currentSceneIndex = 1;
  private static profile: PlayerProfile;
  private static onEndCallBack: () => void;

  constructor(profile: PlayerProfile, onEndCallback: () => void) {
    SceneManager.profile = profile;
    SceneManager.onEndCallBack = onEndCallback;
  }

  public static endGame(): void {
    SceneManager.end = true;
  }

  private static endCallBack(): void {
    SceneManager.end = true;
    SceneManager.onEndCallBack();
  }

  public static setProfile(profile: PlayerProfile): void {
    SceneManager.profile = profile;
  }

  public static getCurrentSceneEnemyCreateConfig(): SceneEnemyCreateConfigType {
    return sceneCollection[this.currentSceneIndex - 1];
  }
  private static selectNextSceneCallBack(): void {
    const nextSceneIndex = ++SceneManager.currentSceneIndex;

    if (nextSceneIndex > sceneCollection.length) {
      throw new Error('Not implemented');
    }
    SceneManager.setCurrentSceneByIndex(
      nextSceneIndex,
      sceneCollection[nextSceneIndex - 1]
    );
  }

  /**
   * Update function the current scene
   */
  public update(dt: number) {
    if (!SceneManager.end) {
      SceneManager.currentScene.update(dt);
    }
  }

  /**
   * Render fuction the current scene
   */
  public render(dt: number) {
    SceneManager.currentScene.render(dt);
  }

  /**
   * Set current scene and init
   */

  public static setCurrentScene(
    name: SceneName,
    sceneEnemyConfig: SceneEnemyCreateConfigType
  ) {
    if (!SceneManager.keyboard) {
      throw new Error('Keyboard is undefined. Set keyboard');
    }
    SceneManager.init(name, SceneManager.profile, sceneEnemyConfig);
  }

  public static setStartScene() {
    if (!SceneManager.keyboard) {
      throw new Error('Keyboard is undefined. Set keyboard');
    }
    const name = SceneManager.sceneOrder[this.currentSceneIndex];
    SceneManager.init(
      name,
      SceneManager.profile,
      sceneCollection[this.currentSceneIndex - 1]
    );
  }

  public static setCurrentSceneByIndex(
    index: number,
    sceneEnemyConfig: SceneEnemyCreateConfigType
  ) {
    if (!SceneManager.keyboard) {
      throw new Error('Keyboard is undefined. Set keyboard');
    }
    const name = SceneManager.sceneOrder[index - 1];
    SceneManager.init(name, SceneManager.profile, sceneEnemyConfig);
  }

  public static setKeyboard(keyboard: KeyboardController) {
    SceneManager.keyboard = keyboard;
  }

  public static init(
    name: SceneName,
    profile: PlayerProfile,
    sceneEnemyConfig: SceneEnemyCreateConfigType
  ) {
    SceneManager.currentScene = new SceneManager.scenesCollection[name](
      SceneManager.keyboard,
      SceneManager.endCallBack,
      SceneManager.selectNextSceneCallBack,
      profile,
      sceneEnemyConfig
    );

    SceneManager.end = false;
    SceneManager.currentScene.init();
  }
}
