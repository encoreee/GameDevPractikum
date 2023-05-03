export class Vector2 {
  constructor(public readonly x: number, public readonly y: number) {}

  public add(vec2: Vector2): Vector2 {
    return new Vector2(this.x + vec2.x, this.y + vec2.y);
  }

  public substract(vec2: Vector2): Vector2 {
    return new Vector2(this.x + vec2.x, this.y - vec2.y);
  }

  public multiply(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  public divide(scalar: number): Vector2 {
    return new Vector2(this.x / scalar, this.y / scalar);
  }

  public lenght(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public normalize(): Vector2 {
    const lenght = this.lenght();
    if (lenght === 0) {
      return new Vector2(0, 0);
    }
    return this.divide(lenght);
  }
}
