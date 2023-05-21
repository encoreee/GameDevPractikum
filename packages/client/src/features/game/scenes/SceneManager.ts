import { PlayerProfile } from '../GamePage';
import { KeyboardController } from '../core/KeyboardController';
import { SimpleSquadScene } from './SimpleSquadScene';
import { SceneInterface } from './SceneInterface';
import { SceneEnemyCreateConfigType } from '../Config';

export enum SceneName {
  LEVEL1 = 'level1',
  LEVEL2 = 'level2',
  LEVEL3 = 'level3',
}
const sceneCollection: SceneEnemyCreateConfigType[] = [
  {
    numberPerRow: 6,
    numberEnemy: 18,
    gap: 50,
  },
  {
    numberPerRow: 8,
    numberEnemy: 24,
    gap: 30,
  },
  {
    numberPerRow: 10,
    numberEnemy: 30,
    gap: 15,
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
  };
  private static sceneOrder: SceneName[] = Object.values(SceneName);
  private static end: boolean;
  private static currentSceneIndex = 1;
  private static profile: PlayerProfile;

  constructor(profile: PlayerProfile) {
    SceneManager.profile = profile;
  }

  private static endCallBack(): void {
    SceneManager.end = true;
  }

  private static selectNextSceneCallBack(): void {
    const nextScene = ++SceneManager.currentSceneIndex;

    switch (nextScene) {
      case 1:
        SceneManager.setCurrentSceneByIndex(
          nextScene,
          sceneCollection[nextScene - 1]
        );
        break;
      case 2:
        SceneManager.setCurrentSceneByIndex(
          nextScene,
          sceneCollection[nextScene - 1]
        );
        break;
      case 3:
        SceneManager.setCurrentSceneByIndex(
          nextScene,
          sceneCollection[nextScene - 1]
        );
        break;
      default:
        throw new Error('Not implemented');
    }
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
    const name = SceneManager.sceneOrder[index];
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
