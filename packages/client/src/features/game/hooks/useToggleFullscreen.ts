import { useRef, useEffect } from 'react';

/**
 * FullScreen hook. Toggle full screen `div` element. Must be bound to the `ref` of the required div element
 * @param key `typeof KeyboardEvent.key`
 * @returns HTMLDivElement
 */
export const useToggleFullScreen = (key: string) => {
  const element = useRef<HTMLDivElement>(null);

  const toggleFullScreen = async () => {
    if (element.current === null) {
      throw new Error('Element is not defined');
    }
    if (!document.fullscreenElement) {
      await element.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDownHandler);

    return () => {
      document.removeEventListener('keydown', onKeyDownHandler);
    };
  }, [element]);

  const onKeyDownHandler = (event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey) return;

    if (event.key === key) {
      toggleFullScreen();
    }
  };

  return element;
};
