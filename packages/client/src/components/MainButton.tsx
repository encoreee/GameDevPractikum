import { Button } from '@mui/material';
import { FunctionComponent, ReactEventHandler } from 'react';

interface MainButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: ReactEventHandler;
}

const MainButton: FunctionComponent<MainButtonProps> = (props) => {
  return (
    <Button
      type="submit"
      disabled={props.disabled}
      sx={{
        width: '100%',
        height: 60,
        margin: 1,
        marginTop: 2,
        fontSize: 24,
        borderRadius: '0px',
      }}
      variant="contained"
      onClick={props.onClick}
      color="secondary">
      {props.label}
    </Button>
  );
};

export default MainButton;
