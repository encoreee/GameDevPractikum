import { FunctionComponent } from 'react';
import { Typography } from '@mui/material';

type FormErrorMessageProps = {
  errorMessage: string;
  maxWidth?: string;
};

const FormErrorMessage: FunctionComponent<FormErrorMessageProps> = (props) => {
  return (
    <Typography
      maxWidth={props.maxWidth}
      align="center"
      sx={{
        color: 'error.main',
        fontSize: 9,
        margin: '0px',
      }}>
      {props.errorMessage}
    </Typography>
  );
};

FormErrorMessage.defaultProps = {
  maxWidth: '350px',
};

export default FormErrorMessage;
