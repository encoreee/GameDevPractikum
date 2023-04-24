import { FC } from 'react';

import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';

import { Container, Grid, TextField, Typography } from '@mui/material';

const styles = {
  content: {
    color: 'white',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '700px',
    padding: '0px',
  },
  mainText: {
    fontSize: '24px',
  },
  text: {
    span: {
      position: 'relative',
      cursor: 'pointer',
      padding: '10px',

      '&:hover': {
        textDecorationLine: 'underline',
      },
    },
  },
  backText: {
    cursor: 'pointer',
    fontSize: '12px',
    marginTop: '50px',
    background: 'linear-gradient(145.51deg, #AC5DD9 7.21%, #004FC4 94.47%)',
    textFillColor: 'transparent',
    backgroundClip: 'text',
  },
};

const LeaderBoardPage: FC = () => {
  return (
    <MainPageTemplate>
      <Container style={styles.content}>
        <Typography sx={styles.mainText}>Leaders</Typography>

        <Typography sx={styles.text}>
          Sort by: <span>score</span>|<span>name</span>
        </Typography>
      </Container>

      <DataBox marginTop={0}></DataBox>

      <Container>
        <Typography sx={styles.backText}> Back</Typography>
        <Typography></Typography>
      </Container>
    </MainPageTemplate>
  );
};

export default LeaderBoardPage;
