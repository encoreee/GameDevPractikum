import { KeyboardController } from './core/KeyboardController';
import { SceneManager } from './scenes/SceneManager';
import { Canvas } from './core/Canvas';
import { GameLoop } from './core/GameLoop';
import { PlayerProfile } from './scenes/SceneUtils/PlayerUtils';
import Audio from '../Audio/Audio';
import Stats, { GameStats } from './scenes/Stats';

export class GalagaGame {
  public readonly keyboard: KeyboardController = new KeyboardController();
  private readonly gameloop: GameLoop;
  private readonly sceneManager: SceneManager;
  public onEndGame?: (gameStats: GameStats) => void;

  constructor() {
    this.gameloop = new GameLoop(
      this.update.bind(this),
      this.render.bind(this)
    );
    this.sceneManager = new SceneManager(this.end.bind(this));
  }

  public init(profile: PlayerProfile): void {
    SceneManager.setProfile(profile);
    SceneManager.setKeyboard(this.keyboard);
    SceneManager.setStartScene();

    Stats.resetStats();
    this.gameloop.continue(false);
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

  private end(gameStats: GameStats): void {
    SceneManager.setInitialSceneIndex();

    Audio.stopAll();
    if (this.onEndGame) {
      this.onEndGame(gameStats);
    }
  }

  public endGame(): void {
    SceneManager.setInitialSceneIndex();
    SceneManager.endGame();
    Audio.stopAll();
  }
}
