import { SxProps } from '@mui/material';

export const mainBoxStyles: SxProps = {
  backgroundColor: 'primary.main',
  height: '24rem',
  borderRadius: 0,
  padding: '0.875rem 3rem 0.875rem',
  overflow: 'auto',
  width: '960px',
  display: 'flex',
  flexDirection: 'column',
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
    color: 'text.primary',
    transition: '0.1s ease-in color',
  },
  '&:hover': {
    border: '0px',
    '& .forum__table-cell': {
      textDecoration: 'underline',
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
  color: 'text.secondary',
  cursor: 'default',
};

export const tableBodyCellStyles: SxProps = {
  ...tableCellStyles,
  padding: '0.5rem 1.125rem',
};

export const userInfoStyles: SxProps = {
  alignItems: 'center',
  gap: '0.5rem',
  paddingRight: '1rem',
};

export const smallTextStyles: SxProps = { fontSize: '0.5rem', color: '#fff' };

export const greenButtonStyles = {};
