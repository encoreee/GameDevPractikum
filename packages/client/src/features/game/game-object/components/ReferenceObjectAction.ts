import { ReferenceObject } from './../ReferenceObject';
import { ReferenceObjectComponent } from './Components';

export class ReferenceObjectAction implements ReferenceObjectComponent {
  public update(
    referenceObject: ReferenceObject,
    text: string,
    dt: number
  ): void {
    referenceObject.text = text;
  }
}
