import { Vector2 } from '../../../utils/Vector2';
import { GameObjectComponent } from '../Graphics/Components';
import { GameObject, EnemyBulletObject } from '../Objects/GameObject';
import { playerConfig } from '../../../Config';
import { SceneManager } from '@/features/game/scenes/SceneManager';

export class PlayerBulletPhysics implements GameObjectComponent {
  public update(playerBulletObject: GameObject, dt: number): void {
    playerBulletObject.position = playerBulletObject.position.add(
      // Игрок стреляет вертикально вверх
      new Vector2(0, -playerConfig.bulletSpeed).multiply(dt)
    );
  }
}

export class EnemyBulletPhysics implements GameObjectComponent {
  public update(
    enemyBulletObject: EnemyBulletObject,
    dt: number,
    _: number,
    playerObject: GameObject
  ): void {
    const sceneEnemyConfig = SceneManager.getCurrentSceneEnemyCreateConfig();
    //Если снаряд не выстрелен, вычисляется направление, и сохраняется
    if (!enemyBulletObject.shooted) {
      // Вычисление вектора разницы игрока и врага, для определение направления выстрела, и замедление
      enemyBulletObject.defaultAttackDirection = playerObject.position
        .substract(enemyBulletObject.position)
        .divide(sceneEnemyConfig.enemyShotDeceleration);

      enemyBulletObject.shooted = true;
    }

    //Если снаряд выстрелен, то обновление происхождит по сохраненному направлению
    enemyBulletObject.position = enemyBulletObject.position.add(
      enemyBulletObject.defaultAttackDirection.multiply(dt)
    );
  }
}
