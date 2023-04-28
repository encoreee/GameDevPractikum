import { Container } from '@mui/material';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { GalagaGame } from './core/GalagaGame';

const styles: React.CSSProperties = {
  border: '1px solid silver',
};

const GamePage: FunctionComponent = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const HEIGHT = 500;
  const WIDTH = 500;

  useEffect(() => {
    if (canvas.current) {
      galaga.setCanvas(canvas.current);
    }
  }, []);

  const galaga = new GalagaGame(WIDTH, HEIGHT);
  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    galaga.keyboard.keyDownHandler(event.key);
  };
  const onKeyUpHandler = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    galaga.keyboard.keyUpHandler(event.key);
  };

  return (
    <Container>
      <canvas
        tabIndex={1}
        onKeyDown={onKeyDownHandler}
        onKeyUp={onKeyUpHandler}
        ref={canvas}
        width={WIDTH}
        height={HEIGHT}
        style={styles}></canvas>
    </Container>
  );
};

export default GamePage;
