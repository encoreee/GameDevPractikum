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
import { GameResult } from './types';

enum Steps {
  GameOver,
  Result,
}

const GAME_RESULT_MOCK: GameResult = {
  shots: 755,
  hits: 322,
};

type ToResult = () => void;

interface GameOverProps {
  toResult: ToResult;
}

const GameOverStep: FC<GameOverProps> = ({ toResult }) => {
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const listener = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      toResult();
    }
  };

  const addListener = () => {
    window.addEventListener('keydown', listener);
  };

  const removeListener = () => {
    window.removeEventListener('keydown', listener);
  };

  setTimeout(() => {
    setIsMessageVisible(true);
  }, 1000);

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
        <Typography fontSize={'1.25rem'}>Press Enter to continue</Typography>
      </Fade>
    </>
  );
};

interface ResultProps {
  gameResult: GameResult;
}

const ResultStep: FC<ResultProps> = ({ gameResult }) => {
  const hitMissRatio = ((gameResult.hits / gameResult.shots) * 100).toFixed(2);
  return (
    <Grid container width={'40rem'} rowGap={'1.25rem'}>
      <Grid item xs={12}>
        <Typography sx={statsTitle}>- RESULT -</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography sx={statsShots}>SHOTS FIRED</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={statsShotsValue}>{gameResult.shots}</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography sx={statsHits}>NUMBER OF HITS</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={statsHitsValue}>{gameResult.hits}</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography sx={statsRatio}>HIT-MISS RATIO</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={statsRatioValue}>{hitMissRatio}%</Typography>
      </Grid>
      <Grid item xs={5}>
        <Button href="#try-again" sx={BtnRed}>
          TRY AGAIN
        </Button>
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

  const toResult: ToResult = () => {
    setStep(Steps.Result);
  };

  return (
    <EmptyMainPageTemplate>
      {step === Steps.Result ? (
        <ResultStep gameResult={GAME_RESULT_MOCK} />
      ) : (
        <GameOverStep toResult={toResult} />
      )}
    </EmptyMainPageTemplate>
  );
};

export default GameOver;
