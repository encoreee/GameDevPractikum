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

export function createExplosion(position: Vector2): ExplosionObject {
  return new ExplosionObject(
    position,
    { width: 60, height: 60 },
    new GameObjectPhysics(),
    new ExplosionObjectGraphics(7)
  );
}
