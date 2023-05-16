import { GameObjectPhysics } from '../../game-object/components/GameObjectPhysics';
import { PlayerLiveObjectGraphics } from '../../game-object/components/Graphics/PlayerLiveObjectGraphics';
import { PlayerCreateConfigType } from '../../Config';
import { Vector2 } from '../../utils/Vector2';
import { GameObjectCollection } from '../../utils/GameObjectCollection';
import { PlayerLiveObject } from '../../game-object/GameObject';
import { GameObjectGraphics } from '../../game-object/components/Graphics/GameObjectGraphics';
import { Player } from '../../game-object/Player';
import { PlayerInput } from '../../game-object/components/PlayerInput';
import { KeyboardController } from '../../core/KeyboardController';
import { createBullet } from './BulletUtils';

export function createPlayerLives(
  livesCollection: GameObjectCollection,
  config: PlayerCreateConfigType,
  livesCount: number
): void {
  {
    livesCollection.erase();
    for (let i = 0; i < livesCount; i++) {
      const live = new PlayerLiveObject(
        new Vector2(
          config.playerLives.gap +
            i * (config.playerLives.gap + config.playerLives.size.width),
          config.canvasSize.height - config.playerLives.size.height * 2
        ),
        config.playerLives.size,
        new GameObjectPhysics(),
        new PlayerLiveObjectGraphics()
      );
      livesCollection.push(live);
    }
  }
}

export function createPlayer(
  config: PlayerCreateConfigType,
  keyboard: KeyboardController,
  playerBulletCollection: GameObjectCollection
): Player {
  const position = new Vector2(
    config.canvasSize.width / 2 - config.size.width / 2,
    config.canvasSize.height - config.size.height - config.paddingBottom
  );

  const fireCallback = fireAction(config, playerBulletCollection);

  const input = new PlayerInput(
    keyboard.getAction(),
    config.speed,
    fireCallback
  );

  return new Player(
    position,
    config.size,
    input,
    new GameObjectPhysics(),
    new GameObjectGraphics()
  );
}

/**
 * @returns `fireCallback` a function that should be called on each fire action
 */
export function fireAction(
  config: PlayerCreateConfigType,
  playerBulletCollection: GameObjectCollection
) {
  let lastBulletCreateTime = 0;

  return (position: Vector2) => {
    const currentBulletCreateTime = performance.now();
    if (
      currentBulletCreateTime >
      lastBulletCreateTime + config.bulletCreateDelay
    ) {
      const bullet = createBullet(
        position,
        config.bulletSize,
        config.size,
        true
      );
      playerBulletCollection.push(bullet);
      lastBulletCreateTime = currentBulletCreateTime;
    }
  };
}
