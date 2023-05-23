import { FunctionComponent, useEffect, useState } from 'react';
import { Stack, Typography, Zoom } from '@mui/material';
import EmptyMainPageTemplate from '@/components/EmptyMainPageTemplate';
import { useNavigate } from 'react-router-dom';

const countDownData = ['3', '2', '1', 'start!'];
const TIME_IN = 1000;
const TIME_OUT = 500;

const GameStartPage: FunctionComponent = () => {
  const [currentLabel, setCurrentLabel] = useState(countDownData[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [tick, setTick] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentLabel(countDownData[currentIndex]);
    setCurrentIndex(currentIndex + 1);
    setChecked(true);
    if (currentIndex > countDownData.length) {
      navigate('/game');
    }
  }, [tick]);

  useEffect(() => {
    const timerIn = setInterval(() => {
      setTick(!tick);
      setChecked(() => false);
      clearInterval(timerOut);
    }, TIME_IN);
    const timerOut = setInterval(() => {
      setChecked(() => false);
    }, TIME_OUT);

    return () => {
      clearInterval(timerIn);
      clearInterval(timerOut);
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
