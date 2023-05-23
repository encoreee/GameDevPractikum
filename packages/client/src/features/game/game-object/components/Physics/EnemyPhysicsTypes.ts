import { Vector2 } from '@/features/game/utils/Vector2';

export enum MovementTypes {
  LINEAR,
  CIRCLE,
  RETURNING,
  STOP,
}

export const PI = 3.14;
export interface Movement {
  type: MovementTypes;
}

export type EnemyMovement = LinerMovement | CircleMovement | Movement;

export interface LinerMovement extends Movement {
  targetPosition: Vector2;
}

export function instanceOfLinerMovement(
  object: Movement
): object is LinerMovement {
  return object.type === MovementTypes.LINEAR;
}

export function instanceOfCircleMovement(
  object: Movement
): object is CircleMovement {
  return object.type === MovementTypes.CIRCLE;
}

export interface CircleMovement extends Movement {
  startAngle: number;
  roundsCount: number;
  direction: 'positive' | 'negative';
}
