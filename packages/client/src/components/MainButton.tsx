import { Button } from '@mui/material';
import { FunctionComponent } from 'react';

interface MainButtonProps {
  label: string;
}

const MainButton: FunctionComponent<MainButtonProps> = (props) => {
  return (
    <Button
      type="submit"
      sx={{
        width: '100%',
        height: 60,
        margin: 1,
        marginTop: 2,
        fontSize: 24,
        borderRadius: '0px',
      }}
      variant="contained"
      color="secondary">
      {props.label}
    </Button>
  );
};

export default MainButton;
