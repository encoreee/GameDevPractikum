import { Box, Stack, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { styled } from '@mui/system';

import Background from '../assets/background.png'; // Import using relative path
import loader from '../assets/loader.gif';

const Container = styled('div')({
  height: '100vh',
});

const styles = {
  box: {
    width: '100%',
    minHeight: '100%',
    backgroundImage: `url(${Background})`,
  },
};

const LoadingScreen: FC<PropsWithChildren> = () => {
  return (
    <Container>
      <Box sx={{ display: 'flex', margin: 0, padding: 0 }} style={styles.box}>
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
