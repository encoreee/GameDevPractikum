import MainPageTemplate from '@/components/MainPageTemplate';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { canvasSize } from './Config';
import { Canvas } from './core/Canvas';
import { GalagaGame } from './GalagaGame';
import { playerConfig } from '../game/Config';

const styles: React.CSSProperties = {
  border: '1px solid silver',
  backgroundColor: 'hsla(0, 0%, 56%, 30%)',
  backdropFilter: 'blur(4px)',
  marginTop: '2rem',
};

export type PlayerProfile = {
  displayName: string;
  points: number;
  lives: number;
};

const dummy: PlayerProfile = {
  displayName: 'Alex',
  points: 0,
  lives: playerConfig.playerLives.lives,
};

const galaga = new GalagaGame(dummy);

const GamePage: FunctionComponent = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

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
  }, [canvas]);

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
        width={canvasSize.width}
        height={canvasSize.height}
        style={styles}></canvas>
    </MainPageTemplate>
  );
};

export default GamePage;
