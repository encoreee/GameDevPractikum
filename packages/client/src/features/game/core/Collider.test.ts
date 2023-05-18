import { GameObject, Size } from '../game-object/GameObject';
import { Vector2 } from '../utils/Vector2';
import { Collider } from './Collider';

type GameObjectMockType = Pick<GameObject, 'position' | 'size'>;

describe('Collider (wall)', () => {
  let collider: Collider;
  let mockGameObject1: GameObjectMockType;
  const canvasSizeMock: Size = {
    width: 200,
    height: 200,
  };
  beforeEach(() => {
    mockGameObject1 = {
      position: new Vector2(0, 0),
      size: {
        width: canvasSizeMock.width / 4,
        height: canvasSizeMock.height / 4,
      },
    };

    collider = new Collider(mockGameObject1 as GameObject);
  });

  it('not collide with wall', () => {
    mockGameObject1.position = new Vector2(
      canvasSizeMock.width / 2,
      canvasSizeMock.height / 2
    );
    expect(collider.collideWithWall(canvasSizeMock)).toBe(false);
  });

  it('not collide with wall (obj.position === [0, 0])', () => {
    mockGameObject1.position = new Vector2(0, 0);
    expect(collider.collideWithWall(canvasSizeMock)).not.toBe(true);
  });

  it('obj.position === canvasSize', () => {
    mockGameObject1.position = new Vector2(
      canvasSizeMock.width,
      canvasSizeMock.width
    );
    expect(collider.collideWithWall(canvasSizeMock)).toBe(true);
  });

  it('obj.x < 0', () => {
    mockGameObject1.position = new Vector2(-1, 0);
    expect(collider.collideWithWall(canvasSizeMock)).toBe(true);
  });

  it('obj.x > canvasSize', () => {
    mockGameObject1.position = new Vector2(
      canvasSizeMock.width + mockGameObject1.size.width + 1,
      0
    );
    expect(collider.collideWithWall(canvasSizeMock)).toBe(true);
  });

  it('obj.y < 0', () => {
    mockGameObject1.position = new Vector2(0, -1);
    expect(collider.collideWithWall(canvasSizeMock)).toBe(true);
  });

  it('obj.y > canvasSize', () => {
    mockGameObject1.position = new Vector2(
      0,
      canvasSizeMock.height + mockGameObject1.size.height + 1
    );
    expect(collider.collideWithWall(canvasSizeMock)).toBe(true);
  });
});
