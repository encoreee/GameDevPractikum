import { GameObjectPhysics } from '../../game-object/components/GameObjectPhysics';
import { PlayerLiveObjectGraphics } from '../../game-object/components/Graphics/PlayerLiveObjectGraphics';
import { PlayerCreateConfigType } from '../../Config';
import { Vector2 } from '../../utils/Vector2';
import { GameObjectCollection } from '../../utils/GameObjectCollection';
import {
  EnemyBulletObject,
  GameObject,
  PlayerLiveObject,
} from '../../game-object/GameObject';
import { GameObjectGraphics } from '../../game-object/components/Graphics/GameObjectGraphics';
import { Size } from '../../game-object/components/Components';
import {
  EnemyBulletPhysics,
  PlayerBulletPhysics,
} from '../../game-object/components/BulletPhysics';

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

export function createBullet(
  position: Vector2,
  bulletSize: Size,
  objectSize: Size,
  player: boolean
): GameObject {
  if (player) {
    return new GameObject(
      position.add(new Vector2(objectSize.width / 2 - bulletSize.width / 2, 0)),
      bulletSize,
      new PlayerBulletPhysics(),
      new GameObjectGraphics()
    );
  } else {
    return new EnemyBulletObject(
      position.add(new Vector2(objectSize.width / 2 - bulletSize.width / 2, 0)),
      bulletSize,
      new EnemyBulletPhysics(),
      new GameObjectGraphics()
    );
  }
}
