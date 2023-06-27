import { FC, useEffect, useState } from 'react';
import { Typography, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { apiSlice } from '@/app/apiSlice';
import AuthController from '@/controllers/authController';
import Audio, { AUDIO_IDS } from '@/features/Audio';
import mainShipFullHealth from '../../assets/mainShipFullHealth.svg';

import NavLink from '../../components/NavLink';
import MainPageTemplate from '@/components/MainPageTemplate';
import Notification, { FORM_NOTIFICATION_TYPE } from '@components/Notification';

const styles = {
  listItem: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'text.primary',
    padding: '10px',
    borderBottom: '5px',
    opacity: '0.85',
    '&:hover': {
      opacity: '1',
      '&:before': {
        content: `url(${mainShipFullHealth})`,
        left: -35,
        position: 'absolute',
      },
    },
  },
  listContainer: {
    marginTop: '30px',
  },
  link: {
    color: 'text.primary',
    textDecoration: 'none',
  },
};

const HomePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleMouseEnter = () => Audio.play(AUDIO_IDS.Jump);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onLogout = async () => {
    const error = await AuthController.logout();

    if (error) {
      console.log(error);
      setError(error);
      return;
    }

    dispatch(apiSlice.util.resetApiState());
    navigate('/signin');
  };

  useEffect(() => {
    Audio.stopAll();
    Audio.play(AUDIO_IDS.mainTheme, { loop: true });
    return () => {
      Audio.stopAll();
    };
  }, []);

  return (
    <MainPageTemplate>
      <List sx={styles.listContainer}>
        <ListItem sx={styles.listItem} onMouseEnter={handleMouseEnter}>
          <NavLink href="/start" sx={styles.link} underline="none" variant="h1">
            <Typography>start game</Typography>
          </NavLink>
        </ListItem>
        <ListItem sx={styles.listItem}>
          <NavLink
            href="/leaderboard"
            sx={styles.link}
            underline="none"
            variant="h1">
            <Typography>leader board</Typography>
          </NavLink>
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
          <Typography onClick={onLogout}>log out</Typography>
        </ListItem>
        <Notification text={error} type={FORM_NOTIFICATION_TYPE.ERROR} />
      </List>
    </MainPageTemplate>
  );
};

export default HomePage;
