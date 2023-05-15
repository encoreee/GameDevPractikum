import { GameObject } from '../GameObject';
import { ReferenceObject } from '../ReferenceObject';

export interface GameObjectComponent {
  update(
    gameObject: GameObject,
    dt: number,
    absTime?: number,
    refObject?: GameObject
  ): void;
}

export interface EnemyBulletObjectComponent extends GameObjectComponent {
  shuted: boolean;
  update(
    gameObject: GameObject,
    dt: number,
    absTime?: number,
    refObject?: GameObject
  ): void;
}

export interface GraphicComponent {
  render(gameObject: GameObject, dt: number): void;
}

export interface ReferenceObjectComponent {
  update(referenceObject: ReferenceObject, text: string, dt: number): void;
}

export interface GraphicReferenceComponent {
  render(referenceObject: ReferenceObject, dt: number): void;
}

export type Size = {
  width: number;
  height: number;
};
