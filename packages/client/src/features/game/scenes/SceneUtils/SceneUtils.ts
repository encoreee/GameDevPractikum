import { PlayerProfile } from '../../GamePage';
import { ReferenceObjectAction } from '../../game-object/components/Physics/ReferenceObjectAction';
import { ReferenceObjectGraphics } from '../../game-object/components/Graphics/ReferenceObjectGraphics';
import { Vector2 } from '../../utils/Vector2';
import { ReferenceObject } from '../../game-object/components/Objects/ReferenceObject';
import { Size } from '../../game-object/components/Graphics/Components';

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
