import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography } from '@mui/material';

import MainPageTemplate from '../../components/MainPageTemplate';
import defaultAvatar from '../../assets/defaultAvatar.svg';
import BreadCrumbs from '@components/BreadCrumbs';

import TextButton, { TextButtonVariant } from '@/components/TextButton';

const styles = {
  content: {
    color: 'text.primary',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '700px',
    padding: '0px',
  },
  text: {
    color: 'text.primary',
    fontSize: 14,
    cursor: 'default',
    span: {
      position: 'relative',
      cursor: 'pointer',
      padding: '10px',
      '&:hover': {
        textDecorationLine: 'underline',
      },
    },
  },
  gridStyle: { width: '680px' },
  gridContainer: {
    backgroundColor: 'primary.main',
    color: 'text.primary',
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
  const navigate = useNavigate();
  const breadCrumbItems = ['Leaders'];

  const onBack = () => {
    navigate('/');
  };

  return (
    <MainPageTemplate>
      <Container style={styles.content}>
        <BreadCrumbs items={breadCrumbItems} />
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
        <TextButton
          label="&lt;- Back"
          onClick={onBack}
          variant={TextButtonVariant.SECONDARY}
        />
        <TextButton
          label="&lt;Prev Page"
          variant={TextButtonVariant.CLEAN}
          disabled={true}
        />
        <TextButton label="Next Page&gt;" variant={TextButtonVariant.CLEAN} />
      </Container>
    </MainPageTemplate>
  );
};

export default LeaderBoardPage;
