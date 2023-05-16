import { Canvas } from '../../core/Canvas';
import { ReferenceObject } from '../ReferenceObject';
import { GraphicReferenceComponent } from './Components';

export class ReferenceObjectGraphics implements GraphicReferenceComponent {
  private readonly canvas = Canvas;

  constructor(private color: string, private size: number) {}
  public render(referenceObject: ReferenceObject, dt: number): void {
    this.canvas.getContext2D().fillStyle = `${this.color}`;
    this.canvas.getContext2D().font = `${this.size}pt "Press Start 2P"`;
    this.canvas
      .getContext2D()
      .fillText(
        referenceObject.text,
        referenceObject.position.x + dt,
        referenceObject.position.y + dt
      );
  }
}
