import { SxProps } from '@mui/material';

export const mainBox: SxProps = {
  backgroundColor: 'primary.dark',
  height: '24rem',
  borderRadius: 0,
  padding: '0.875rem',
  overflow: 'auto',
  width: '960px',
};

export const cleanButton: SxProps = {
  color: '#fff',
  textTransform: 'none',
};

export const purpleButton: SxProps = {
  ...cleanButton,
  background: 'linear-gradient(145.51deg, #AC5DD9 7.21%, #004FC4 94.47%)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
};

export const greenButton: SxProps = {
  ...cleanButton,
  background: 'linear-gradient(147.14deg, #00D0DE 6.95%, #05A660 93.05%)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
};

export const bottomNav: SxProps = {
  flexDirection: 'row',
  width: '100%',
  marginTop: '0.25rem',
};
