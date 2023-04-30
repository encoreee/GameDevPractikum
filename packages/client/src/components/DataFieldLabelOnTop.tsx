import { Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, FunctionComponent } from 'react';

interface DataFieldProps {
  label: string;
  onChange?: (newValue: string) => void;
  value?: string;
}

const DataField: FunctionComponent<DataFieldProps> = (props) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography
        variant="h6"
        color="primary.main"
        style={{
          marginBottom: '0px',
        }}>
        {props.label}{' '}
      </Typography>
      <TextField
        style={{
          backgroundColor: 'black',
          marginBottom: '30px',
          marginTop: '0px',
        }}
        InputProps={{
          style: {
            color: 'white',
          },
        }}
        onChange={onChange}
        value={props.value}
      />
    </Stack>
  );
};

export default DataField;
