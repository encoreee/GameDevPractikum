import { FC } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';

import BackGround from '../../assets/backGround.png';
import spaceZero from '../../assets/spaceZero.svg';
import spaceRock1 from '../../assets/spaceRock1.svg';
import spaceRock2 from '../../assets/spaceRock2.svg';
import NavLink from '../../components/NavLink';

const Container = styled('div')({
  height: '98vh',
});

const styles = {
  paper: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '100%',
    backgroundImage: `url(${BackGround})`,
  },
  error: {
    fontWeight: '400',
    fontSize: '128px',
  },
  subtext: {
    fontSize: '24px',
  },
  backText: {
    cursor: 'pointer',
    fontSize: '12px',
    marginTop: '50px',
    background: 'linear-gradient(145.51deg, #AC5DD9 7.21%, #004FC4 94.47%)',
    textFillColor: 'transparent',
    backgroundClip: 'text',
  },
  imageSpace: { padding: '10px' },
};

const Error: FC<{ errorType: string; errorMessage: string }> = ({
  errorType,
  errorMessage,
}) => {
  return (
    <Container>
      <Paper sx={styles.paper}>
        <Stack
          sx={{ margin: 'auto' }}
          direction="column"
          justifyContent="center"
          alignItems="center">
          {errorType === '404' ? (
            <Typography sx={styles.error}>
              4<img src={spaceZero} alt="spacezero" />4
            </Typography>
          ) : (
            <Typography sx={styles.error}>
              5
              <img
                src={spaceRock1}
                alt="spaceRock1"
                style={styles.imageSpace}
              />
              <img
                src={spaceRock2}
                alt="spaceRock2"
                style={styles.imageSpace}
              />
            </Typography>
          )}

          <Typography sx={styles.subtext}>{errorMessage}</Typography>

          <NavLink href="/">
            <Typography sx={styles.backText}>
              &#9664; Back to home page{' '}
            </Typography>
          </NavLink>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Error;
