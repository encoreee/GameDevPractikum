import { PlayerProfile } from '../../GamePage';
import { ReferenceObject } from '../../game-object/ReferenceObject';
import { Size } from '../../game-object/components/Components';
import { ReferenceObjectAction } from '../../game-object/components/ReferenceObjectAction';
import { ReferenceObjectGraphics } from '../../game-object/components/ReferenceObjectGraphics';
import { Vector2 } from '../../utils/Vector2';

export function createPlayerPoint(profile: PlayerProfile): ReferenceObject {
  return new ReferenceObject(
    profile.points.toString(),
    new Vector2(10, 30),
    new ReferenceObjectAction(),
    new ReferenceObjectGraphics('blue', 23)
  );
}

export function createLabel(text: string, canvasSize: Size): ReferenceObject {
  return new ReferenceObject(
    text,
    new Vector2(canvasSize.width / 2 - 50, canvasSize.height / 2),
    new ReferenceObjectAction(),
    new ReferenceObjectGraphics('white', 30)
  );
}
