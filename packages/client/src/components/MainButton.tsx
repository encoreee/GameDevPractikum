import { Button } from '@mui/material';
import { FC, ReactEventHandler } from 'react';

interface MainButtonProps {
  label: string;
  disabled?: boolean;
  type?: 'submit' | 'button';
  onClick?: ReactEventHandler;
  color?: string;
  fontSize?: number;
}

const MainButton: FC<MainButtonProps> = (props) => {
  const sx = {
    width: '100%',
    height: 60,
    marginTop: 2,
    fontSize: 24,
    borderRadius: '0px',
    backgroundColor: '',
  };

  if (props.fontSize) {
    sx.fontSize = props.fontSize;
  }

  if (props.color) {
    sx.backgroundColor = props.color;
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
