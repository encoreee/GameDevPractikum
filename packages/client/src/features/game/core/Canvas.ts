import { Size } from '../game-object/components/Graphics/Components';

export class Canvas {
  private static htmlCanvasInstance?: HTMLCanvasElement;

  public static getInstance(): HTMLCanvasElement {
    if (!Canvas.htmlCanvasInstance) {
      throw new Error('HTMLCanvasElement is not defined');
    }

    return Canvas.htmlCanvasInstance;
  }

  public static create(canvas: HTMLCanvasElement) {
    if (Canvas.htmlCanvasInstance !== canvas) {
      this.htmlCanvasInstance = canvas;
    }
  }

  public static getContext2D(): CanvasRenderingContext2D {
    const context = Canvas.getInstance().getContext('2d');
    if (!context) {
      throw new Error('Rendering context 2D is not defined');
    }
    return context;
  }

  public static size(): Size {
    return {
      width: Canvas.getInstance().width,
      height: Canvas.getInstance().height,
    };
  }
}
