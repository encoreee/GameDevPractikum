import { SxProps } from '@mui/material';

export const mainBoxStyles: SxProps = {
  backgroundColor: 'primary.dark',
  height: '24rem',
  borderRadius: 0,
  padding: '0.875rem 3rem 0.875rem',
  overflow: 'auto',
  width: '960px',
};

export const cleanButtonStyles: SxProps = {
  color: '#fff',
  textTransform: 'none',
};

export const purpleButtonStyles: SxProps = {
  ...cleanButtonStyles,
  background: 'linear-gradient(145.51deg, #AC5DD9 7.21%, #004FC4 94.47%)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
};

export const greenButtonStyles: SxProps = {
  ...cleanButtonStyles,
  background: 'linear-gradient(147.14deg, #00D0DE 6.95%, #05A660 93.05%)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
};

export const bottomNavStyles: SxProps = {
  flexDirection: 'row',
  width: '100%',
  marginTop: '0.25rem',
};

export const changePageBtnsStyles: SxProps = {
  flexDirection: 'row',
  flexGrow: '1',
  justifyContent: 'center',
  gap: '4rem',
};

export const tableBodyRowStyles: SxProps = {
  border: '0px',
  '& .forum__table-cell': {
    color: '#fff',
    transition: '0.1s ease-in color',
  },
  '&:hover': {
    border: '0px',
    '& .forum__table-cell': {
      color: 'primary.main',
      cursor: 'pointer',
    },
  },
};

export const tableCellStyles: SxProps = {
  whiteSpace: 'nowrap',
  padding: '0 0.875rem',
  borderBottom: '0px',
  border: '0px',
};

export const tableHeadCellStyles: SxProps = {
  ...tableCellStyles,
  color: 'primary.main',
};

export const tableBodyCellStyles: SxProps = {
  ...tableCellStyles,
  padding: '0.5rem 1.125rem',
};

export const userInfoStyle: SxProps = {
  alignItems: 'center',
  gap: '0.5rem',
  paddingRight: '1rem',
};

export const smallTextStyle: SxProps = { fontSize: '0.5rem', color: '#fff' };
