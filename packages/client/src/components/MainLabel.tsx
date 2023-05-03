import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

const MainLabel: FC = () => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-end"
      alignItems="flex-end"
      spacing={0}>
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
        Galaga
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          backgroundcolor: 'primary',
          backgroundImage: `linear-gradient(180deg, #006569, #035639)`,
          backgroundSize: '100%',
          backgroundRepeat: 'repeat',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          opacity: 0.6,
        }}>
        by react&.
      </Typography>
    </Stack>
  );
};

export default MainLabel;
