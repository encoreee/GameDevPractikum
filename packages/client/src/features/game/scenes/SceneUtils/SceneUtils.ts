import { ReferenceObjectAction } from '../../game-object/components/Physics/ReferenceObjectAction';
import { ReferenceObjectGraphics } from '../../game-object/components/Graphics/ReferenceObjectGraphics';
import { Vector2 } from '../../utils/Vector2';
import { ReferenceObject } from '../../game-object/components/Objects/ReferenceObject';
import { ExplosionObject } from '../../game-object/components/Objects/GameObject';
import { GameObjectPhysics } from '../../game-object/components/Physics/GameObjectPhysics';
import { ExplosionObjectGraphics } from '../../game-object/components/Graphics/ExplosionObjectGraphics';
import { PlayerExplosionObjectGraphics } from '../../game-object/components/Graphics/PlayerExplosionObjectGraphics';
import Audio, { AUDIO_IDS } from '@/features/Audio';
import { enemyExplosionConfig } from '../../Config';
import { labelsConfig } from '../../Config';
import { PlayerProfile } from './PlayerUtils';

export function createPlayerPoint(profile: PlayerProfile): ReferenceObject {
  return new ReferenceObject(
    profile.points.toString(),
    labelsConfig.pointPosition,
    new ReferenceObjectAction(),
    new ReferenceObjectGraphics(
      labelsConfig.pointsLabelColor,
      labelsConfig.pointFontSize
    )
  );
}

export function createLabel(text: string): ReferenceObject {
  return new ReferenceObject(
    text,
    labelsConfig.mainLabelPosition,
    new ReferenceObjectAction(),
    new ReferenceObjectGraphics(
      labelsConfig.mainLabelColor,
      labelsConfig.mainLabelFontSize
    )
  );
}

export enum ExplosionObjectType {
  PLAYER,
  ENEMY,
}

export function createExplosion(
  position: Vector2,
  exposilonType: ExplosionObjectType,
  dt: number
): ExplosionObject {
  switch (exposilonType) {
    case ExplosionObjectType.ENEMY: {
      const exp = new ExplosionObject(
        position,
        enemyExplosionConfig.size,
        new GameObjectPhysics(),
        new ExplosionObjectGraphics(enemyExplosionConfig.exposionDelay)
      );
      Audio.play(AUDIO_IDS.EnemyExplosion);
      exp.render(dt);
      return exp;
    }

    case ExplosionObjectType.PLAYER: {
      const exp = new ExplosionObject(
        position,
        enemyExplosionConfig.size,
        new GameObjectPhysics(),
        new PlayerExplosionObjectGraphics(enemyExplosionConfig.exposionDelay)
      );
      exp.render(dt);
      Audio.play(AUDIO_IDS.PlayerExplosion);
      return exp;
    }

    default:
      throw new Error('Not implemented');
  }
}
