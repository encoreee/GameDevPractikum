import { setupJestCanvasMock } from 'jest-canvas-mock';
import { Canvas } from '../../../core/Canvas';
import { Vector2 } from '../../../utils/Vector2';
import { GameObject } from '../Objects/GameObject';
import { GameObjectGraphics } from './GameObjectGraphics';

describe('GameObjectGraphics component', () => {
  let graphic: GameObjectGraphics;
  const canvas = document.createElement('canvas');
  const gameObjectMock = {
    position: new Vector2(0, 0),
    size: {
      width: 1,
      height: 1,
    },
  };
  beforeEach(() => {
    graphic = new GameObjectGraphics();
    jest.resetAllMocks();
    setupJestCanvasMock();
    Canvas.create(canvas);
  });
  test('render', () => {
    expect(graphic.render(gameObjectMock as GameObject, 1));
  });
});
