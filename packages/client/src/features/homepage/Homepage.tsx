import { FC, useEffect } from 'react';
import { Typography, List, ListItem } from '@mui/material';

import MainPageTemplate from '@/components/MainPageTemplate';

import mainShipFullHealth from '../../assets/mainShipFullHealth.svg';
import NavLink from '../../components/NavLink';
import Audio, { AUDIO_IDS } from '@/features/Audio';

const styles = {
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
  const handleMouseEnter = () => Audio.play(AUDIO_IDS.Jump);
  useEffect(() => {
    Audio.stopAll();
    Audio.play(AUDIO_IDS.mainTheme, { loop: true });
    return () => {
      Audio.stopAll();
    };
  });
  return (
    <MainPageTemplate>
      <List sx={styles.listContainer}>
        <ListItem sx={styles.listItem} onMouseEnter={handleMouseEnter}>
          <NavLink href="/start" sx={styles.link} underline="none" variant="h1">
            <Typography>Start game</Typography>
          </NavLink>
        </ListItem>
        <ListItem sx={styles.listItem} onMouseEnter={handleMouseEnter}>
          <Typography>leader board</Typography>
        </ListItem>
        <ListItem sx={styles.listItem} onMouseEnter={handleMouseEnter}>
          <NavLink
            href="/profile"
            sx={styles.link}
            underline="none"
            variant="h1">
            <Typography>profile</Typography>
          </NavLink>
        </ListItem>
        <ListItem sx={styles.listItem} onMouseEnter={handleMouseEnter}>
          <NavLink href="/forum" sx={styles.link} underline="none" variant="h1">
            <Typography>forums</Typography>
          </NavLink>
        </ListItem>
        <ListItem sx={styles.listItem} onMouseEnter={handleMouseEnter}>
          <Typography>log out</Typography>
        </ListItem>
      </List>
    </MainPageTemplate>
  );
};

export default HomePage;
