import { FC } from 'react';
import { Typography, List, ListItem } from '@mui/material';

import MainPageTemplate from '@/components/MainPageTemplate';

import BackGround from '../../assets/backGround.png';

import mainShipFullHealth from '../../assets/mainShipFullHealth.svg';
import NavLink from '../../components/NavLink';

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
    <MainPageTemplate>
      <List sx={styles.listContainer}>
        <ListItem sx={styles.listItem}>
          <Typography>start game</Typography>
        </ListItem>
        <ListItem sx={styles.listItem}>
          <Typography>leader board</Typography>
        </ListItem>
        <ListItem sx={styles.listItem}>
          <NavLink
            href="/profile"
            sx={styles.link}
            underline="none"
            variant="h1">
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
    </MainPageTemplate>
  );
};

export default HomePage;
