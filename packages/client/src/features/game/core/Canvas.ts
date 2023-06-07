import { Size } from '../game-object/components/Graphics/Components';

export class Canvas {
  private static htmlCanvasInstance?: HTMLCanvasElement;

  public static getInstaice(): HTMLCanvasElement {
    if (Canvas.htmlCanvasInstance === undefined) {
      throw new Error('HTMLCanvasElement is not defined');
    }

    return Canvas.htmlCanvasInstance;
  }

  public static create(canvas: HTMLCanvasElement) {
    if (Canvas.htmlCanvasInstance !== canvas) {
      this.htmlCanvasInstance = canvas;
    }
  }

  public static remove() {
    // this.htmlCanvasInstance = undefined;
    if (Canvas.htmlCanvasInstance) {
      delete Canvas.htmlCanvasInstance;
    }
  }

  public static getContext2D(): CanvasRenderingContext2D {
    const context = Canvas.getInstaice().getContext('2d');
    if (!context) {
      throw new Error('Rendering context 2D is not defined');
    }
    return context;
  }

  public static size(): Size {
    return {
      width: Canvas.getInstaice().width,
      height: Canvas.getInstaice().height,
    };
  }
}
