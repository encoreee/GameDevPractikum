import { FC } from 'react';
import { Typography } from '@mui/material';

export const FORM_NOTIFICATION_TYPE = {
  ERROR: 'error',
  MESSAGE: 'message',
} as const;

type FormErrorMessageProps = {
  text: string;
  maxWidth?: string;
  type?: typeof FORM_NOTIFICATION_TYPE[keyof typeof FORM_NOTIFICATION_TYPE];
};

const FormErrorMessage: FC<FormErrorMessageProps> = (props) => {
  const color =
    props.type === FORM_NOTIFICATION_TYPE.ERROR ? 'error.main' : 'green';

  return (
    <Typography
      maxWidth={props.maxWidth}
      align="center"
      sx={{
        color,
        fontSize: 9,
        margin: '0px',
      }}>
      {props.text}
    </Typography>
  );
};

FormErrorMessage.defaultProps = {
  maxWidth: '350px',
  type: FORM_NOTIFICATION_TYPE.MESSAGE,
};

export default FormErrorMessage;
