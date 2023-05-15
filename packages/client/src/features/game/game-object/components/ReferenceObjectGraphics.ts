import { Canvas } from '../../core/Canvas';
import { ReferenceObject } from '../ReferenceObject';
import { GraphicReferenceComponent } from './Components';

export class ReferenceObjectGraphics implements GraphicReferenceComponent {
  private readonly canvas = Canvas;
  public render(referenceObject: ReferenceObject, dt: number): void {
    this.canvas.getContext2D().fillStyle = 'blue';
    this.canvas.getContext2D().font = '23pt Calibri';
    this.canvas
      .getContext2D()
      .fillText(
        referenceObject.text,
        referenceObject.position.x + dt,
        referenceObject.position.y + dt
      );
  }
}
