import { ActionFlagType } from '@/features/game/core/KeyboardController';
import { Vector2 } from '@/features/game/utils/Vector2';
import { GameObject } from '../Objects/GameObject';
import { Size } from './Components';
import { PlayerInput } from './PlayerInput';

describe('PlayerInput component', () => {
  let actionFlagMock: ActionFlagType;
  let fireCallbackMock: jest.Mock;
  let gameObjectMock: {
    position: Vector2;
    size: Size;
    collideWithLeftWall(): boolean;
    collideWithRightWall(canvasSize: Size): boolean;
  };
  let input: PlayerInput;
  const speed = 10;
  beforeEach(() => {
    actionFlagMock = {
      FIRE: false,
      LEFT: false,
      RIGHT: false,
    };
    fireCallbackMock = jest.fn();
    gameObjectMock = {
      position: new Vector2(0, 0),
      size: {
        width: 0,
        height: 0,
      },
      collideWithLeftWall() {
        return false;
      },
      collideWithRightWall() {
        return false;
      },
    };
    input = new PlayerInput(actionFlagMock, speed, fireCallbackMock);
  });

  it('player left position update', () => {
    actionFlagMock.LEFT = true;
    input.update(gameObjectMock as GameObject, 1);
    expect(gameObjectMock.position).toStrictEqual(new Vector2(-speed, 0));
  });

  it('player right position update', () => {
    actionFlagMock.RIGHT = true;
    input.update(gameObjectMock as GameObject, 1);
    expect(gameObjectMock.position).toStrictEqual(new Vector2(speed, 0));
  });

  it('player cant left continue if collide left wall', () => {
    actionFlagMock.LEFT = true;
    gameObjectMock.collideWithLeftWall = () => true;
    input.update(gameObjectMock as GameObject, 1);
    expect(gameObjectMock.position).toStrictEqual(new Vector2(0, 0));
  });

  it('player cant right continue if collide right wall', () => {
    actionFlagMock.RIGHT = true;
    gameObjectMock.collideWithRightWall = () => true;
    input.update(gameObjectMock as GameObject, 1);
    expect(gameObjectMock.position).toStrictEqual(new Vector2(0, 0));
  });

  it('player can right if collide with left wall', () => {
    actionFlagMock.RIGHT = true;
    gameObjectMock.collideWithLeftWall = () => true;
    input.update(gameObjectMock as GameObject, 1);
    expect(gameObjectMock.position).toStrictEqual(new Vector2(speed, 0));
  });

  it('player cant left if collide with right wall', () => {
    actionFlagMock.LEFT = true;
    gameObjectMock.collideWithRightWall = () => true;
    input.update(gameObjectMock as GameObject, 1);
    expect(gameObjectMock.position).toStrictEqual(new Vector2(-speed, 0));
  });

  it('player pressed both left and right', () => {
    actionFlagMock.LEFT = true;
    actionFlagMock.RIGHT = true;
    input.update(gameObjectMock as GameObject, 1);
    // action to the left has more priority
    expect(gameObjectMock.position).toStrictEqual(new Vector2(-speed, 0));
  });

  it('player fire action and canShoot === true', () => {
    actionFlagMock.FIRE = true;
    input.setShootAbility(true);
    input.update(gameObjectMock as GameObject, 1);
    expect(fireCallbackMock).toBeCalled();
  });

  it('player fire action, canShoot === false', () => {
    actionFlagMock.FIRE = true;
    input.update(gameObjectMock as GameObject, 1);
    expect(fireCallbackMock).not.toBeCalled();
  });
});
