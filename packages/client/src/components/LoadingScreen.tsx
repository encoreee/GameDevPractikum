import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { styled } from '@mui/system';

import loader from '../assets/loader.gif';

const Container = styled('div')({
  height: '100vh',
});

const boxStyles = {
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  margin: 0,
  padding: 0,
};

const LoadingScreen: FC = () => {
  return (
    <Container>
      <Box sx={boxStyles}>
        <Stack
          sx={{ margin: 'auto' }}
          direction="column"
          justifyContent="center"
          alignItems="center">
          <img src={loader} alt="spacezero" width={80} height={80} />
          <Typography fontSize={'0.5rem'}>Loading...</Typography>
        </Stack>
      </Box>
    </Container>
  );
};

export default LoadingScreen;
