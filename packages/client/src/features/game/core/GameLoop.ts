export type GameLoopCallback = (dt: number) => void;

export class GameLoop {
  private previous = performance.now();
  private step = 1 / 60; //amount of time per frame
  private dt = 0; // delta time
  private stop = false;

  constructor(
    private update: GameLoopCallback,
    private render: GameLoopCallback
  ) {}

  private frame() {
    const current = performance.now();
    this.dt = this.dt + Math.min(1, (current - this.previous) / 1000);

    while (this.dt > this.step && !this.stop) {
      this.dt = this.dt - this.step;
      this.update(this.step);
    }

    this.previous = current;

    this.render(this.dt);
    requestAnimationFrame(this.frame.bind(this));
  }

  public start() {
    this.frame();
  }

  public continue(value: boolean) {
    this.stop = value;
  }
}
