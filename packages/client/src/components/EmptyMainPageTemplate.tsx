import { Box, Stack } from '@mui/material';
import { FunctionComponent, PropsWithChildren } from 'react';
import { styled } from '@mui/system';

import ThemeSwitch from './ThemeSwitch';
import { SoundSwitch } from './SoundSwitch';

const Container = styled('div')({
  height: '100vh',
});

const styles = {
  box: {
    width: '100%',
    minHeight: '100%',
  },
};

const EmptyMainPageTemplate: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <Container>
      <Box sx={{ display: 'flex', margin: 0, padding: 0 }} style={styles.box}>
        <Stack
          sx={{ margin: 'auto' }}
          direction="column"
          justifyContent="center"
          alignItems="center">
          {props.children}
        </Stack>
      </Box>
      <SoundSwitch />
      <ThemeSwitch />
    </Container>
  );
};

export default EmptyMainPageTemplate;
