import { Button } from '@mui/material';
import { FunctionComponent } from 'react';

interface MainButtonProps {
  label: string;
  type?: 'submit' | 'button';
}

const MainButton: FunctionComponent<MainButtonProps> = (props) => {
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
      color="secondary"
      type={props.type || 'button'}>
      {props.label}
    </Button>
  );
};

export default MainButton;
