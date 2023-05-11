import { KeyboardController } from '../core/KeyboardController';
import { EndScene } from './EndScene';
import { GameScene } from './GameScene';
import { SceneInterface } from './SceneInterface';
import { StartScene } from './StartScene';

export enum SceneName {
  START = 'start',
  GAME = 'game',
  GAMEOVER = 'gameover',
}

type ScenesCollectionType = Record<
  SceneName,
  new (keyboard: KeyboardController) => SceneInterface
>;

export class SceneManager {
  private static currentScene: SceneInterface;
  private static keyboard: KeyboardController;
  private static scenesCollection: ScenesCollectionType = {
    game: GameScene,
    start: StartScene,
    gameover: EndScene,
  };

  /**
   * Update function the current scene
   */
  public update(dt: number) {
    SceneManager.currentScene.update(dt);
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
    SceneManager.currentScene = new SceneManager.scenesCollection[name](
      SceneManager.keyboard
    );
    SceneManager.currentScene.init();
  }

  public static setKeyboard(keyboard: KeyboardController) {
    SceneManager.keyboard = keyboard;
  }
}
