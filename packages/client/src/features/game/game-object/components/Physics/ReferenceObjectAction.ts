import { ReferenceObjectComponent } from '../Graphics/Components';
import { ReferenceObject } from '../Objects/ReferenceObject';

export class ReferenceObjectAction implements ReferenceObjectComponent {
  public update(referenceObject: ReferenceObject, text: string): void {
    referenceObject.text = text;
  }
}
