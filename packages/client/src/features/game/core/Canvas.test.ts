import { Canvas } from './Canvas';
import { setupJestCanvasMock } from 'jest-canvas-mock';
describe('Canvas', () => {
  const canvas = document.createElement('canvas');
  beforeEach(() => {
    jest.resetAllMocks();
    setupJestCanvasMock();
    Canvas.create(canvas);
  });
  it('get HTMLCanvasElement', () => {
    expect(Canvas.getInstance() instanceof HTMLCanvasElement).toBe(true);
  });

  it('get CanvasRenderingContext2D', () => {
    expect(Canvas.getContext2D() instanceof CanvasRenderingContext2D).toBe(
      true
    );
  });
});
