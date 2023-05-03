import MainPageTemplate from '@/components/MainPageTemplate';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { Canvas } from './core/Canvas';
import { GalagaGame } from './GalagaGame';

const styles: React.CSSProperties = {
  border: '1px solid silver',
  backgroundColor: 'hsla(0, 0%, 56%, 30%)',
  // backdropFilter: 'blur(4px)',
  marginTop: '2rem',
};

const GamePage: FunctionComponent = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const HEIGHT = 500;
  const WIDTH = 500;

  const galaga = new GalagaGame();

  useEffect(() => {
    document.addEventListener('keydown', onKeyDownHandler);
    document.addEventListener('keyup', onKeyUpHandler);

    if (canvas.current) {
      Canvas.create(canvas.current);
      galaga.init();
    }

    return () => {
      document.removeEventListener('keydown', onKeyDownHandler);
      document.removeEventListener('keyup', onKeyUpHandler);
    };
  }, []);

  const onKeyDownHandler = (event: KeyboardEvent) => {
    galaga.keyboard.keyDownHandler(event.key);
  };
  const onKeyUpHandler = (event: KeyboardEvent) => {
    galaga.keyboard.keyUpHandler(event.key);
  };

  return (
    <MainPageTemplate>
      <canvas
        ref={canvas}
        width={WIDTH}
        height={HEIGHT}
        style={styles}></canvas>
    </MainPageTemplate>
  );
};

export default GamePage;
