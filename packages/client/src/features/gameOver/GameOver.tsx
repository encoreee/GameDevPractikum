import EmptyMainPageTemplate from '@/components/EmptyMainPageTemplate';
import { Button, Fade, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import {
  BtnBlue,
  BtnRed,
  statsHits,
  statsHitsValue,
  statsRatio,
  statsRatioValue,
  statsShots,
  statsShotsValue,
  statsTitle,
} from './styles';
import { Link } from 'react-router-dom';
import { GameResult, ToResult } from './types';
import Audio from '../Audio/Audio';
import { AUDIO_IDS } from '../Audio';
import Stats from '../game/scenes/Stats';
import notifyMe from '@/utils/notify';

export enum Steps {
  GameOver,
  Result,
}

interface GameOverProps {
  toResult: ToResult;
}

const GameOverStep: FC<GameOverProps> = ({ toResult }) => {
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const listener = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      toResult();
    }
  };

  const addListener = () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', listener);
    }
  };

  const removeListener = () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', listener);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsMessageVisible(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isMessageVisible) {
      addListener();
    }
    return removeListener;
  }, [isMessageVisible]);
  return (
    <>
      <Typography fontSize={'4rem'}>Game Over</Typography>
      <Fade in={isMessageVisible} timeout={2000}>
        <Typography fontSize={'1.25rem'}>Press Space to continue</Typography>
      </Fade>
    </>
  );
};

interface ResultProps {
  gameResult: GameResult;
}

const ResultStep: FC<ResultProps> = ({ gameResult }) => {
  const hitMissRatio =
    gameResult.shoot === 0
      ? 0
      : ((gameResult.hit / gameResult.shoot) * 100).toFixed(2);
  return (
    <Grid container width={'40rem'} rowGap={'1.25rem'}>
      <Grid item xs={12}>
        <Typography sx={statsTitle} variant="h2">
          - RESULT -
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography sx={statsShots}>SHOTS FIRED</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={statsShotsValue}>{gameResult.shoot}</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography sx={statsHits}>NUMBER OF HITS</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={statsHitsValue}>{gameResult.hit}</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography sx={statsRatio}>HIT-MISS RATIO</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={statsRatioValue}>{hitMissRatio}%</Typography>
      </Grid>
      <Grid item xs={5}>
        <Link to="/start">
          <Button sx={BtnRed}>TRY AGAIN</Button>
        </Link>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={5}>
        <Link to="/">
          <Button sx={BtnBlue}>MENU</Button>
        </Link>
      </Grid>
    </Grid>
  );
};

const GameOver: FC = () => {
  const [step, setStep] = useState<Steps>(Steps.GameOver);

  // TODO: Изменить на редакс
  const gameResult: GameResult = Stats.getStats();

  useEffect(() => {
    Audio.stopAll();
    Audio.play(AUDIO_IDS.endGameTheme, { loop: true });
    notifyMe('We hope you enjoyed the game');
    return () => {
      Audio.stopAll();
    };
  }, []);

  const toResult: ToResult = () => {
    setStep(Steps.Result);
  };

  return (
    <EmptyMainPageTemplate>
      {step === Steps.Result ? (
        <ResultStep gameResult={gameResult} />
      ) : (
        <GameOverStep toResult={toResult} />
      )}
    </EmptyMainPageTemplate>
  );
};

export default GameOver;
