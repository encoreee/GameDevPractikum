import { ChangeEvent, FC } from 'react';
import { DataFieldProps } from './types';
import { Stack, TextField, Typography } from '@mui/material';

const DataFieldTop: FC<DataFieldProps> = ({
  label,
  autoFocus,
  value,
  onChange,
  inputRef,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target?.value);
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
        {label}
      </Typography>
      <TextField
        autoFocus={autoFocus}
        inputRef={inputRef}
        style={{
          backgroundColor: 'black',
          marginBottom: '30px',
          marginTop: '0px',
        }}
        inputProps={{
          style: {
            color: 'white',
          },
        }}
        onChange={handleChange}
        value={value}
      />
    </Stack>
  );
};

export default DataFieldTop;