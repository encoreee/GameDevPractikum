import { FC } from 'react';
import defaultAvatar from '@assets/defaultAvatar.svg';
import { Box } from '@mui/material';

interface AvatarProps {
  src?: string;
  alt?: string;
}

const Avatar: FC<AvatarProps> = ({ src, alt = 'avatar' }) => {
  return (
    <Box sx={styles.box}>
      {src ? (
        <img src={defaultAvatar} alt={alt} />
      ) : (
        <img src={src} alt={alt} />
      )}
    </Box>
  );
};

export default Avatar;

const styles = {
  box: {
    width: '2.5rem',
    height: '2.5rem',
    background: 'transparent',
    boxShadow: 'none',
    border: '2px solid #fff',
    borderRadius: '0px',
    padding: '0.25rem',
    img: { width: '100%', height: '100%' },
  },
};
