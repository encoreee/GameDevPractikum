import { Stack, TextField, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

interface DataFieldProps {
  label: string;
  value?: string;
}

const DataField: FunctionComponent<DataFieldProps> = (props) => {
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
        value={props.value}
      />
    </Stack>
  );
};

export default DataField;
