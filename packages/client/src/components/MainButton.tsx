import { Button, SxProps } from '@mui/material';
import { FC, ReactEventHandler } from 'react';

interface MainButtonProps {
  label: string;
  disabled?: boolean;
  type?: 'submit' | 'button';
  onClick?: ReactEventHandler;
  sx?: SxProps;
}

const MainButton: FC<MainButtonProps> = (props) => {
  const sx: SxProps = {
    width: '100%',
    height: 60,
    marginTop: 2,
    fontSize: 24,
    borderRadius: '0px',
  };

  if (props.sx) {
    Object.assign(sx, props.sx);
  }

  return (
    <Button
      sx={sx}
      variant="contained"
      onClick={props.onClick}
      disabled={props.disabled}
      color="secondary"
      type={props.type || 'button'}>
      {props.label}
    </Button>
  );
};

export default MainButton;
