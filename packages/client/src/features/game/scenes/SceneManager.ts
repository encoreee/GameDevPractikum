import { PlayerProfile } from '../GamePage';
import { KeyboardController } from '../core/KeyboardController';
import { EndScene } from './EndScene';
import { GameSceneLevel1 } from './GameSceneLevel1';
import { GameSceneLevel2 } from './GameSceneLevel2';
import { GameSceneLevel3 } from './GameSceneLevel3';
import { SceneInterface } from './SceneInterface';
import { StartScene } from './StartScene';

export enum SceneName {
  START = 'start',
  LEVEL1 = 'level1',
  LEVEL2 = 'level2',
  LEVEL3 = 'level3',
  GAMEOVER = 'gameover',
}

type ScenesCollectionType = Record<
  SceneName,
  new (
    keyboard: KeyboardController,
    endGameCallback: () => void,
    selectNextSceneCallBack: () => void,
    profile: PlayerProfile
  ) => SceneInterface
>;

export class SceneManager {
  private static currentScene: SceneInterface;
  private static keyboard: KeyboardController;
  private static scenesCollection: ScenesCollectionType = {
    start: StartScene,
    level1: GameSceneLevel1,
    level2: GameSceneLevel2,
    level3: GameSceneLevel3,
    gameover: EndScene,
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
    SceneManager.setCurrentSceneByIndex(++SceneManager.currentSceneIndex);
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
  public static setCurrentScene(name: SceneName) {
    if (!SceneManager.keyboard) {
      throw new Error('Keyboard is undefined. Set keyboard');
    }
    SceneManager.init(name, SceneManager.profile);
  }

  public static setCurrentSceneByIndex(index: number) {
    if (!SceneManager.keyboard) {
      throw new Error('Keyboard is undefined. Set keyboard');
    }
    const name = SceneManager.sceneOrder[index];
    SceneManager.init(name, SceneManager.profile);
  }

  public static setKeyboard(keyboard: KeyboardController) {
    SceneManager.keyboard = keyboard;
  }

  public static init(name: SceneName, profile: PlayerProfile) {
    SceneManager.currentScene = new SceneManager.scenesCollection[name](
      SceneManager.keyboard,
      SceneManager.endCallBack,
      SceneManager.selectNextSceneCallBack,
      profile
    );
    SceneManager.end = false;
    SceneManager.currentScene.init();
  }
}
