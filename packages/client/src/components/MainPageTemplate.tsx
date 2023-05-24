import { Box, Stack } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { styled } from '@mui/system';

import Background from '../assets/background.png'; // Import using relative path

import MainLabel from './MainLabel';
import { SoundSwitch } from './SoundSwitch';

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

const MainPageTemplate: FC<PropsWithChildren> = (props) => {
  return (
    <Container>
      <Box sx={{ display: 'flex', margin: 0, padding: 0 }} style={styles.box}>
        <Stack
          sx={{ margin: 'auto' }}
          direction="column"
          justifyContent="center"
          alignItems="center">
          <MainLabel />
          {props.children}
        </Stack>
      </Box>
      <SoundSwitch />
    </Container>
  );
};

export default MainPageTemplate;
