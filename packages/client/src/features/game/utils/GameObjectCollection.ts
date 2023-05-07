import { GameObject } from '../game-object/GameObject';

export class GameObjectCollection<T extends GameObject = GameObject> {
  constructor(private collection: T[] = []) {}

  public push(...items: T[]) {
    this.collection.push(...items);
  }

  public delete(index: number) {
    this.collection.splice(index, 1);
  }

  public getObject(index: number): T {
    const enemy = this.collection[index];
    return enemy;
  }

  public empty(): boolean {
    return this.collection && this.collection.length === 0;
  }

  public count(): number {
    return this.collection.length;
  }

  /**
   * Iterate over an array of elements from the end
   */
  public forEachFromEnd(callback: (element: T, index: number) => void) {
    const lastIndex = this.collection.length - 1;
    for (let i = lastIndex; i >= 0; i--) {
      callback(this.collection[i], i);
    }
  }
}
