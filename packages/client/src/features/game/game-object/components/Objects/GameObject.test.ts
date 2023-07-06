import { Vector2 } from '@/features/game/utils/Vector2';
import { GameObjectComponent, GraphicComponent } from '../Graphics/Components';
import { GameObject } from './GameObject';

describe('GameObject', () => {
  const physicsComponentMock: GameObjectComponent = {
    update: jest.fn(),
  };
  const graphicComponentMock: GraphicComponent = {
    render: jest.fn(),
  };
  const gameObject = new GameObject(
    new Vector2(0, 0),
    { width: 0, height: 0 },
    physicsComponentMock,
    graphicComponentMock
  );
  it('call components in update and render', () => {
    gameObject.update(0);
    gameObject.render(0);

    expect(physicsComponentMock.update).toBeCalled();
    expect(graphicComponentMock.render).toBeCalled();
  });
});
