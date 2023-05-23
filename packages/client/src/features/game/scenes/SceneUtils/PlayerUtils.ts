import { PlayerLiveObjectGraphics } from '../../game-object/components/Graphics/PlayerLiveObjectGraphics';
import { PlayerCreateConfigType } from '../../Config';
import { Vector2 } from '../../utils/Vector2';
import { GameObjectCollection } from '../../utils/GameObjectCollection';
import { PlayerLiveObject } from '../../game-object/components/Objects/GameObject';
import { PlayerInput } from '../../game-object/components/Graphics/PlayerInput';
import { KeyboardController } from '../../core/KeyboardController';
import { createBullet } from './BulletUtils';
import { Player } from '../../game-object/components/Objects/Player';
import { GameObjectPhysics } from '../../game-object/components/Physics/GameObjectPhysics';
import { PlayerObjectGraphics } from '../../game-object/components/Graphics/PlayerObjectGraphics';
import Audio, { AUDIO_IDS } from '@/features/Audio';

export type PlayerProfile = {
  displayName: string;
  points: number;
  lives: number;
};

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
    new PlayerObjectGraphics()
  );
}

/**
 * @returns Функция обратного вызова для создания выстрела. Позволяет создвать выстрелы с задержкой
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
      Audio.play(AUDIO_IDS.PlayerShoot);
      playerBulletCollection.push(bullet);
      lastBulletCreateTime = currentBulletCreateTime;
    }
  };
}
