import { EnemyBulletObject, GameObject } from '../../game-object/GameObject';
import {
  EnemyBulletPhysics,
  PlayerBulletPhysics,
} from '../../game-object/components/BulletPhysics';
import { Size } from '../../game-object/components/Components';
import { GameObjectGraphics } from '../../game-object/components/Graphics/GameObjectGraphics';
import { Vector2 } from '../../utils/Vector2';

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