import { FC } from 'react';

import MainPageTemplate from '../../components/MainPageTemplate';
import defaultAvatar from '../../assets/defaultAvatar.svg';

import { Box, Container, Grid, Typography } from '@mui/material';

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
    background: 'linear-gradient(145.51deg, #AC5DD9 7.21%, #004FC4 94.47%)',
    textFillColor: 'transparent',
    backgroundClip: 'text',
  },
  gridStyle: { width: '680px' },
  gridContainer: {
    backgroundColor: 'primary.dark',
    color: 'white',
    width: 700,
    height: 400,
  },
};

const data = [
  { avatar: defaultAvatar, name: 'Ivan Petrov', score: '3643' },
  { avatar: defaultAvatar, name: 'Semen Ivanov', score: '2913' },
  { avatar: defaultAvatar, name: 'Maksim Sinica', score: '2654' },
];

const LeaderBoardPage: FC = () => {
  return (
    <MainPageTemplate>
      <Container style={styles.content}>
        <Typography sx={styles.mainText}>Leaders</Typography>

        <Typography sx={styles.text}>
          Sort by: <span>score</span>|<span>name</span>
        </Typography>
      </Container>

      <Box sx={styles.gridContainer}>
        {data.map((person, index) => {
          return (
            <Grid
              container
              alignItems="center"
              margin={1}
              spacing={2}
              sx={styles.gridStyle}
              key={index + person.name + person.score}>
              <Grid item xs={2}>
                <Typography>{index + 1}</Typography>
              </Grid>
              <Grid item xs={2}>
                <img src={person.avatar} alt="avatar" />
              </Grid>
              <Grid item xs={6}>
                <Typography>{person.name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{person.score}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Box>

      <Container style={styles.content}>
        <Typography sx={styles.backText}> &#9664; Back</Typography>
        <Typography sx={styles.text}>
          <span>&lt; Previous page</span> <span>Next page &gt;</span>
        </Typography>
      </Container>
    </MainPageTemplate>
  );
};

export default LeaderBoardPage;
