import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { canvasSize, KEY_BINDINGS } from '../Config';
import { GalagaGame } from '../GalagaGame';
import { useToggleFullScreen } from '../hooks/useToggleFullscreen';
import { Canvas as EngineCanvas } from '../core/Canvas';
import { playerConfig } from '../Config';
import Audio from '@features/Audio';
import { PlayerProfile } from '../scenes/SceneUtils/PlayerUtils';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfoQuery } from '@/app/apiSlice';
import type { GameStats } from '../scenes/Stats';
import { useAppDispatch } from '@/app/hooks';
import { postUserToLeaderBoard } from '@/app/leaderboardSlice/leaderboardSlice';
import { GameResult } from '@/infrastructure/api/leaderboard/types';

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

const GameCanvas: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const fullScreenElement = useToggleFullScreen(KEY_BINDINGS.fullScreen);
  const { data } = useGetUserInfoQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const galagaInstance = new GalagaGame();
  const displayName =
    data?.display_name || `${data?.first_name} ${data?.second_name}`;

  const onEndGame = (gameStats: GameStats) => {
    navigate('/game-over');
    const result: GameResult = {
      score: gameStats.score,
      hitRatio: +((gameStats.hit / gameStats.shoot) * 100).toFixed(2),
      displayName,
    };
    dispatch(postUserToLeaderBoard(result));
  };

  useEffect(
    () => () => {
      if (galagaInstance) {
        galagaInstance.endGame();
      }
    },
    []
  );

  useEffect(() => {
    galagaInstance.onEndGame = onEndGame;
    if (canvas.current !== null) {
      document.addEventListener('keydown', onKeyDownHandler);
      document.addEventListener('keyup', onKeyUpHandler);

      const profile: PlayerProfile = {
        displayName,
        points: 0,
        lives: playerConfig.playerLives.lives,
      };

      EngineCanvas.create(canvas.current);

      galagaInstance.init(profile);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('keydown', onKeyDownHandler);
        document.removeEventListener('keyup', onKeyUpHandler);
        EngineCanvas.remove();
        galagaInstance.endGame();
      }
      Audio.stopAll();
    };
  }, [canvas]);

  const onKeyDownHandler = (event: KeyboardEvent) => {
    // Сhecking for a modifier to avoid unexpected behavior
    if (event.altKey || event.ctrlKey) return;
    galagaInstance.keyboard.keyDownHandler(event.key);
  };
  const onKeyUpHandler = (event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey) return;
    galagaInstance.keyboard.keyUpHandler(event.key);
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
