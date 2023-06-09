import { Canvas } from '@/features/game/core/Canvas';
import { Vector2 } from '@/features/game/utils/Vector2';
import { setupJestCanvasMock } from 'jest-canvas-mock';
import { GameObject } from '../Objects/GameObject';
import { EnemyObjectGraphics, EnemyType } from './EnemyObjectGraphics';

describe('EmenyObjectGraphics', () => {
  let enemyGraphics: EnemyObjectGraphics;
  const canvas = document.createElement('canvas');
  const gameObjectMock = {
    position: new Vector2(0, 0),
    size: {
      width: 1,
      height: 1,
    },
  };
  beforeEach(() => {
    enemyGraphics = new EnemyObjectGraphics(EnemyType.ORDINARY);
    jest.resetAllMocks();
    setupJestCanvasMock();
    Canvas.create(canvas);
  });

  it('draw enemy on canvas', () => {
    expect(enemyGraphics.render(gameObjectMock as GameObject, 1));
  });
});
