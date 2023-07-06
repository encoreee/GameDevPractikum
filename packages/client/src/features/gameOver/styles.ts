import { SxProps } from '@mui/material';

export const statsTitle: SxProps = {
  textAlign: 'center',
  color: 'text.primary',
  marginBottom: '4.5rem',
};

export const statsShots: SxProps = { color: '#92B1E4' };

export const statsHits: SxProps = { color: '#43af48' };

export const statsRatio: SxProps = { color: '#B2B902' };

export const statsShotsValue: SxProps = { ...statsShots, textAlign: 'center' };

export const statsHitsValue: SxProps = { ...statsHits, textAlign: 'center' };

export const statsRatioValue: SxProps = { ...statsRatio, textAlign: 'center' };

export const Btn: SxProps = {
  width: '100%',
  height: 60,
  marginTop: 2,
  fontSize: 24,
  borderRadius: '0px',
  color: '#fff',
};

export const BtnRed: SxProps = {
  ...Btn,
  background: 'linear-gradient(145.51deg, #AC5DD9 7.21%, #004FC4 94.47%);',
  opacity: 0.8,
  '&:hover': {
    opacity: 1,
  },
};

export const BtnBlue: SxProps = {
  ...Btn,
  background: 'linear-gradient(180deg, #00D0DE 6.95%, #05A660 93.05%);',
  opacity: 0.8,
  '&:hover': {
    opacity: 1,
  },
};
