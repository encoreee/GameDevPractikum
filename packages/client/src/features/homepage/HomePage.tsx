import { FC } from 'react';
import { Paper, Stack, Typography, List, ListItem } from '@mui/material';
import { styled } from '@mui/system';

import BackGround from '../../assets/backGround.png';
import MainLabel from '../../components/MainLabel';
import mainShipFullHealth from '../../assets/mainShipFullHealth.svg';
import NavLink from '../../components/NavLink';

const Container = styled('div')({
  height: '98vh',
});

const styles = {
  paper: {
    width: '100%',
    minHeight: '100%',
    backgroundImage: `url(${BackGround})`,
  },

  listItem: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white',
    padding: '10px',
    borderBottom: '5px',

    '&:hover': {
      '&:before': {
        content: `url(${mainShipFullHealth})`,
        left: -35,
        color: 'white',
        position: 'absolute',
      },
    },
  },
  listContainer: {
    marginTop: '30px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
};

const HomePage: FC = () => {
  return (
    <Container>
      <Paper style={styles.paper}>
        <Stack
          sx={{ margin: 'auto' }}
          direction="column"
          justifyContent="center"
          alignItems="center">
          <MainLabel />

          <List sx={styles.listContainer}>
            <ListItem sx={styles.listItem}>
              <Typography>start game</Typography>
            </ListItem>
            <ListItem sx={styles.listItem}>
              <Typography>leader board</Typography>
            </ListItem>
            <ListItem sx={styles.listItem}>
              <NavLink sx={styles.link} href="/profile">
                <Typography>profile</Typography>
              </NavLink>
            </ListItem>
            <ListItem sx={styles.listItem}>
              <Typography>forums</Typography>
            </ListItem>
            <ListItem sx={styles.listItem}>
              <Typography>log out</Typography>
            </ListItem>
          </List>
        </Stack>
      </Paper>
    </Container>
  );
};

export default HomePage;
