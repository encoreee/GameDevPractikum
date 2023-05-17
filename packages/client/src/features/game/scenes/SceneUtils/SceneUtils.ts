import { PlayerProfile } from '../../GamePage';
import { ReferenceObjectAction } from '../../game-object/components/Physics/ReferenceObjectAction';
import { ReferenceObjectGraphics } from '../../game-object/components/Graphics/ReferenceObjectGraphics';
import { Vector2 } from '../../utils/Vector2';
import { ReferenceObject } from '../../game-object/components/Objects/ReferenceObject';
import { Size } from '../../game-object/components/Graphics/Components';
import {
  ExplosionObject,
  GameObject,
} from '../../game-object/components/Objects/GameObject';
import { GameObjectPhysics } from '../../game-object/components/Physics/GameObjectPhysics';
import { ExplosionObjectGraphics } from '../../game-object/components/Graphics/ExplosionObjectGraphics';
import { Player } from './../../game-object/components/Objects/Player';
import { PlayerExplosionObjectGraphics } from '../../game-object/components/Graphics/PlayerExplosionObjectGraphics';

export function createPlayerPoint(profile: PlayerProfile): ReferenceObject {
  return new ReferenceObject(
    profile.points.toString(),
    new Vector2(10, 40),
    new ReferenceObjectAction(),
    new ReferenceObjectGraphics('blue', 23)
  );
}

export function createLabel(text: string, canvasSize: Size): ReferenceObject {
  return new ReferenceObject(
    text,
    new Vector2(canvasSize.width / 2 - 125, canvasSize.height / 2 - 25),
    new ReferenceObjectAction(),
    new ReferenceObjectGraphics('white', 30)
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
        { width: 60, height: 60 },
        new GameObjectPhysics(),
        new ExplosionObjectGraphics(7)
      );
      exp.render(dt);
      return exp;
    }

    case ExplosionObjectType.PLAYER: {
      const exp = new ExplosionObject(
        position,
        { width: 60, height: 60 },
        new GameObjectPhysics(),
        new PlayerExplosionObjectGraphics(7)
      );
      exp.render(dt);
      return exp;
    }

    default:
      throw new Error('Not implemented');
  }
}
