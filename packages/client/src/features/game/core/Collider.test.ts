import { Size } from '../game-object/components/Graphics/Components';
import { GameObject } from '../game-object/components/Objects/GameObject';
import { Vector2 } from '../utils/Vector2';
import { Collider } from './Collider';

type GameObjectMockType = Pick<GameObject, 'position' | 'size'>;

describe('Collider (wall)', () => {
  let collider: Collider;
  let mockGameObject1: GameObjectMockType;
  let mockGameObject2: GameObjectMockType;
  const canvasSizeMock: Size = {
    width: 12,
    height: 12,
  };
  beforeEach(() => {
    mockGameObject1 = {
      position: new Vector2(0, 0),
      size: {
        width: canvasSizeMock.width / 4,
        height: canvasSizeMock.height / 4,
      },
    };
    mockGameObject2 = {
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

  it('collide with other object on RIGHT side and other object is BELOW at the moment of collide (obj.x > other.x) && (obj.y > other.y)', () => {
    mockGameObject2.position = new Vector2(-1, 1 / 4);
    expect(collider.collideWith(mockGameObject2 as GameObject)).toBe(true);
  });

  it('collide with other object on RIGHT side and other objcet is HIGHTER at the moment of collide (obj.x > other.x) && (obj.y < other.y)', () => {
    mockGameObject2.position = new Vector2(-1, 1 / 4);
    expect(collider.collideWith(mockGameObject2 as GameObject)).toBe(true);
  });

  it('collide with other object on LEFT side and other objcet is BELOW at the moment of collide (obj.x < other.x) && (obj.y > other.y)', () => {
    mockGameObject2.position = new Vector2(1, -1 / 4);
    expect(collider.collideWith(mockGameObject2 as GameObject)).toBe(true);
  });

  it('collide with other object on LEFT side and other objcet is HIGHTER at the moment of collide (obj.x > other.x) && (obj.y > other.y)', () => {
    mockGameObject2.position = new Vector2(1, 1 / 4);
    expect(collider.collideWith(mockGameObject2 as GameObject)).toBe(true);
  });

  it('NOT COLLIDE with other object, located along the X axis, but along the axis Y different. (obj.x === other.x) && (obj.y !== other.y)', () => {
    mockGameObject1.position = new Vector2(1, 0);
    mockGameObject2.position = new Vector2(1, 2);
    expect(collider.collideWith(mockGameObject2 as GameObject)).toBe(false);
  });
  it('NOT COLLIDE with other object, located along the Y axis, but along ther axis X different. (obj.x !== other.x) && (obj.y === other.y)', () => {
    mockGameObject1.position = new Vector2(0, 0);
    mockGameObject2.position = new Vector2(2, 0);
    expect(collider.collideWith(mockGameObject2 as GameObject)).toBe(false);
  });
});
