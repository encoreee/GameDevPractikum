import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { canvasSize, KEY_BINDINGS } from '../Config';
import { GalagaGame } from '../GalagaGame';
import { useToggleFullScreen } from '../hooks/useToggleFullscreen';
import { Canvas as EngineCanvas } from '../core/Canvas';

const Canvas = styled.canvas`
  border: 1px solid silver;
  background-color: hsla(0, 0%, 56%, 30%);
  backdrop-filter: blur(4px);
  margin: 0 auto;
`;

const CanvasWrapper = styled.div`
  display: flex;
  padding: 2rem;
`;

const galaga = new GalagaGame();

const GameCanvas: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const fullScreenElement = useToggleFullScreen(KEY_BINDINGS.fullScreen);

  useEffect(() => {
    if (canvas.current !== null) {
      document.addEventListener('keydown', onKeyDownHandler);
      document.addEventListener('keyup', onKeyUpHandler);

      EngineCanvas.create(canvas.current);
      galaga.init();
    }
    return () => {
      document.removeEventListener('keydown', onKeyDownHandler);
      document.removeEventListener('keyup', onKeyUpHandler);
    };
  }, [canvas]);

  const onKeyDownHandler = (event: KeyboardEvent) => {
    // Сhecking for a modifier to avoid unexpected behavior
    if (event.altKey || event.ctrlKey) return;

    galaga.keyboard.keyDownHandler(event.key);
  };
  const onKeyUpHandler = (event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey) return;

    galaga.keyboard.keyUpHandler(event.key);
  };

  return (
    <CanvasWrapper ref={fullScreenElement}>
      <Canvas
        ref={canvas}
        width={canvasSize.width}
        height={canvasSize.height}></Canvas>
    </CanvasWrapper>
  );
};

export default GameCanvas;
