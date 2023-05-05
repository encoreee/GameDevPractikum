import { FunctionComponent, useEffect, useState } from 'react';
import MainPageTemplate from '../../components/MainPageTemplate';
import { useAppSelector } from '@/app/hooks';
import { Stack, Typography, Zoom } from '@mui/material';
import EmptyMainPageTemplate from '@/components/EmptyMainPageTemplate';

const countDownData = ['3', '2', '1', 'start!'];

const GameStartPage: FunctionComponent = () => {
  const [currentLabel, setCurrentLabel] = useState(countDownData[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checked, setChecked] = useState(false);

  const [tick, setTick] = useState(false);

  useEffect(() => {
    setCurrentLabel(countDownData[currentIndex]);
    setCurrentIndex(currentIndex + 1);
    setChecked(true);
    if (currentIndex > countDownData.length) {
      return;
    }
  }, [tick]);

  useEffect(() => {
    const timerIn = setInterval(() => {
      setTick(!tick);
      setChecked(() => false);
      clearInterval(timerOut);
    }, 2000);
    const timerOut = setInterval(() => {
      setChecked(() => false);
    }, 1000);

    return () => {
      clearInterval(timerIn);
    };
  }, [tick]);

  return (
    <EmptyMainPageTemplate>
      <Stack
        margin="auto"
        direction="column"
        justifyContent="center"
        alignItems="center">
        <Zoom in={checked}>
          <Typography
            variant="h1"
            sx={{
              backgroundcolor: 'primary',
              backgroundImage: `linear-gradient(180deg, #CB5DD9, #004FC4)`,
              backgroundSize: '100%',
              backgroundRepeat: 'repeat',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: 160,
            }}>
            {currentLabel}
          </Typography>
        </Zoom>
      </Stack>
    </EmptyMainPageTemplate>
  );
};

export default GameStartPage;
