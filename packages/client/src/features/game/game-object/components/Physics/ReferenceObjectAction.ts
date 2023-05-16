import { ReferenceObjectComponent } from '../Graphics/Components';
import { ReferenceObject } from '../Objects/ReferenceObject';

export class ReferenceObjectAction implements ReferenceObjectComponent {
  public update(
    referenceObject: ReferenceObject,
    text: string,
    dt: number
  ): void {
    referenceObject.text = text;
  }
}
