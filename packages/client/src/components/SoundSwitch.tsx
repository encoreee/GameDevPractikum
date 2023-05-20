import { FC, useEffect, useState } from 'react';
import { ReactComponent as MuteSvg } from '@/assets/mute.svg';
import { ReactComponent as SoundOnSvg } from '@/assets/soundOn.svg';
import { Box, SxProps } from '@mui/material';
import Audio from '@/features/Audio';

export const SoundSwitch: FC = () => {
  const [isSoundOn, setIsSoundOn] = useState(Audio.isSoundOn);

  useEffect(() => {
    setIsSoundOn(Audio.isSoundOn);
  });
  const handleClick = () => {
    if (isSoundOn) {
      Audio.mute();
      setIsSoundOn(false);
    } else {
      Audio.soundOn();
      setIsSoundOn(true);
    }
  };

  return (
    <Box sx={styles} onClick={handleClick}>
      {isSoundOn ? <SoundOnSvg /> : <MuteSvg />}
    </Box>
  );
};

const styles: SxProps = {
  position: 'fixed',
  right: '1rem',
  top: '1rem',
  width: '1rem',
  height: '1rem',
  opacity: '0.5',
  cursor: 'pointer',
  '&:hover': {
    opacity: '1',
  },
};
