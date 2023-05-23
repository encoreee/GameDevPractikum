import { SceneTimeMetrics } from '../SceneInterface';

export function delay(sceneTimeMetrics: SceneTimeMetrics, delay: number) {
  return (timeCheck: number) => {
    const currentTime = performance.now();
    if (currentTime > timeCheck + delay) {
      sceneTimeMetrics.canStart = true;
    }
  };
}
