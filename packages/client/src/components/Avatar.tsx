import { FC } from 'react';
import defaultAvatar from '@assets/defaultAvatar.svg';
import { Box } from '@mui/material';
import { useGetUserInfoQuery } from '@/app/apiSlice';

export const AvatarSize = {
  BIG: 'big',
  MEDIUM: 'medium',
  SMALL: 'small',
} as const;

interface AvatarProps {
  src?: string;
  alt?: string;
  avatarSize?: typeof AvatarSize[keyof typeof AvatarSize];
}

const Avatar: FC<AvatarProps> = ({ src, alt = 'avatar', avatarSize }) => {
  const { data } = useGetUserInfoQuery();
  const avatarSrc = data?.avatar
    ? `https://ya-praktikum.tech/api/v2/resources/${data.avatar}`
    : defaultAvatar;
  const boxStyles = defineAvatarSize(avatarSize ?? AvatarSize.SMALL);

  return (
    <Box sx={boxStyles}>
      <img src={src ?? avatarSrc} alt={alt} />
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

const defineAvatarSize = (avatarSize: string) => {
  switch (avatarSize) {
    case AvatarSize.SMALL:
      return Object.assign({}, styles.box, {
        width: '2.5rem',
        height: '2.5rem',
      });
    case AvatarSize.MEDIUM:
      return Object.assign({}, styles.box, {
        width: '4rem',
        height: '4rem',
      });
    case AvatarSize.BIG:
      return Object.assign({}, styles.box, {
        width: '6rem',
        height: '6rem',
      });
    default:
      return styles.box;
  }
};
