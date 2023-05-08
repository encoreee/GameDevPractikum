export interface SceneInterface {
  init(): void;
  update(dt: number): void;
  render(dt: number): void;
}
