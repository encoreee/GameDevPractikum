import { useRef, useEffect } from 'react';

/**
 * FullScreen hook. Toggle full screen `div` element. Retuned value must be bound to the `ref` attribute of the required div element
 * @param key is `typeof KeyboardEvent.key`
 * @returns value element must be bound with `ref` attribute div element
 */
export const useToggleFullScreen = (key: string) => {
  const element = useRef<HTMLDivElement>(null);

  const toggleFullScreen = async () => {
    if (element.current === null) {
      throw new Error(
        'Full Screen Element is not defined. Check the returned value is bound with ref'
      );
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
