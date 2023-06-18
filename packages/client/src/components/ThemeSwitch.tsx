import { FC } from 'react';
import { Box, SxProps } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { toggleTheme, ThemeMode } from '@/app/themeSlice';
import Moon from '@/assets/moon.png'; // Import using relative path
import Sun from '@/assets/sun.png'; // Import using relative path

const styles: SxProps = {
  position: 'fixed',
  right: '3.2rem',
  top: '0.8rem',
  width: '1rem',
  height: '1rem',
  opacity: '0.7',
  cursor: 'pointer',
  '&:hover': {
    opacity: '1',
  },
};

const ThemeSwitch: FC = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <Box sx={styles} onClick={handleClick}>
      <img
        src={theme === ThemeMode.DARK ? Moon : Sun}
        alt="theme switcher"
        width={29}
        height={26}
      />
    </Box>
  );
};

export default ThemeSwitch;
