import { KeyboardController } from './core/KeyboardController';
import { SceneManager } from './scenes/SceneManager';
import { Canvas } from './core/Canvas';
import { GameLoop } from './core/GameLoop';
import { PlayerProfile } from './GamePage';

export class GalagaGame {
  public readonly keyboard: KeyboardController = new KeyboardController();
  private readonly gameloop: GameLoop;
  private readonly profile: PlayerProfile;

  private readonly sceneManager: SceneManager;

  constructor(profile: PlayerProfile) {
    this.gameloop = new GameLoop(
      this.update.bind(this),
      this.render.bind(this)
    );
    this.profile = profile;
    this.sceneManager = new SceneManager(this.profile);
  }

  public init(): void {
    SceneManager.setKeyboard(this.keyboard);
    SceneManager.setCurrentSceneByIndex(1);
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
