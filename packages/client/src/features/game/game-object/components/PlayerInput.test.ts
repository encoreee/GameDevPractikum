import { ActionFlagType } from '../../core/KeyboardController';
import { Vector2 } from '../../utils/Vector2';
import { GameObject, Size } from '../GameObject';
import { PlayerInput } from './PlayerInput';

describe('PlayerInput component', () => {
  let actionFlagMock: ActionFlagType;
  let fireCallbackMock: jest.Mock;
  let gameObjectMock: {
    position: Vector2;
    size: Size;
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

  it('player pressed both left and right', () => {
    actionFlagMock.LEFT = true;
    actionFlagMock.RIGHT = true;
    input.update(gameObjectMock as GameObject, 1);
    // action to the left has more priority
    expect(gameObjectMock.position).toStrictEqual(new Vector2(-speed, 0));
  });

  it('player fire action', () => {
    actionFlagMock.FIRE = true;
    input.update(gameObjectMock as GameObject, 1);
    expect(fireCallbackMock).toBeCalled();
  });
});
