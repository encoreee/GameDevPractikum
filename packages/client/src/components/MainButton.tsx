import { Button } from '@mui/material';
import { FC, ReactEventHandler } from 'react';

interface MainButtonProps {
  label: string;
  disabled?: boolean;
  type?: 'submit' | 'button';
  onClick?: ReactEventHandler;
}

const MainButton: FC<MainButtonProps> = (props) => {
  return (
    <Button
      sx={{
        width: '100%',
        height: 60,
        marginTop: 2,
        fontSize: 24,
        borderRadius: '0px',
      }}
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
