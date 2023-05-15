import { Vector2 } from '../utils/Vector2';
import {
  GraphicReferenceComponent,
  ReferenceObjectComponent,
  Size,
} from './components/Components';

export class ReferenceObject {
  constructor(
    public text: string,
    public position: Vector2,
    public readonly size: Size,
    protected readonly action: ReferenceObjectComponent,
    protected readonly graphics: GraphicReferenceComponent
  ) {}

  public update(dt: number, text: string): void {
    this.action.update(this, text, dt);
  }

  public render(dt: number): void {
    this.graphics.render(this, dt);
  }
}
