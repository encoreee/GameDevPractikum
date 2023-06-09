import { GameObject } from '../game-object/components/Objects/GameObject';

export class GameObjectCollection<T extends GameObject = GameObject> {
  private cancelationToken;
  constructor(private collection: T[] = []) {
    this.cancelationToken = false;
  }

  public push(...items: T[]) {
    this.collection.push(...items);
  }

  public delete(index: number) {
    this.collection.splice(index, 1);
  }

  public erase() {
    this.collection.splice(0, this.collection.length);
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

  public stopIterate(): void {
    this.cancelationToken = true;
  }

  /**
   * Iterate over an array of elements from the end
   */
  public forEachFromEnd(callback: (element: T, index: number) => void) {
    const lastIndex = this.collection.length - 1;
    for (let i = lastIndex; i >= 0; i--) {
      callback(this.collection[i], i);
      if (this.cancelationToken) {
        break;
      }
    }
    this.cancelationToken = false;
  }
}
