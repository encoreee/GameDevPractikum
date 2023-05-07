import { KeyboardController } from './core/KeyboardController';
import { SceneManager, SceneName } from './scenes/SceneManager';
import { Canvas } from './core/Canvas';
import { GameLoop } from './core/GameLoop';

export class GalagaGame {
  public readonly keyboard: KeyboardController = new KeyboardController();
  private readonly gameloop: GameLoop;

  private readonly sceneManager: SceneManager = new SceneManager();

  constructor() {
    this.gameloop = new GameLoop(
      this.update.bind(this),
      this.render.bind(this)
    );
  }

  public init(): void {
    SceneManager.setKeyboard(this.keyboard);
    SceneManager.setCurrentScene(SceneName.GAME);
    this.gameloop.start();
  }

  private update(dt: number): void {
    this.sceneManager.update(dt);
  }

  private render(dt: number): void {
    Canvas.getContext2D().clearRect(
      0,
      0,
      Canvas.size().width,
      Canvas.size().height
    );

    this.sceneManager.render(dt);
  }
}
