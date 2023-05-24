import { KeyboardController } from './core/KeyboardController';
import { SceneManager } from './scenes/SceneManager';
import { Canvas } from './core/Canvas';
import { GameLoop } from './core/GameLoop';
import { PlayerProfile } from './scenes/SceneUtils/PlayerUtils';
import Audio from '../Audio/Audio';
import { cloneDeep } from 'lodash';

export class GalagaGame {
  public readonly keyboard: KeyboardController = new KeyboardController();
  private readonly gameloop: GameLoop;
  private profile: PlayerProfile;
  private readonly sceneManager: SceneManager;
  public onEndGame?: () => void;

  constructor(profile: PlayerProfile) {
    this.gameloop = new GameLoop(
      this.update.bind(this),
      this.render.bind(this)
    );
    this.profile = profile;
    this.sceneManager = new SceneManager(
      cloneDeep(this.profile),
      this.end.bind(this)
    );
  }

  public init(): void {
    SceneManager.setKeyboard(this.keyboard);
    SceneManager.setStartScene();
    SceneManager.setProfile(cloneDeep(this.profile));
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

  private end(): void {
    if (this.onEndGame) {
      this.onEndGame();
      Audio.stopAll();
    }
  }

  public endGame(): void {
    SceneManager.endGame();
    Audio.stopAll();
  }
}
