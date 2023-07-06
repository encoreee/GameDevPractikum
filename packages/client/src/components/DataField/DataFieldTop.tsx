import { ChangeEvent, FC } from 'react';
import { DataFieldProps } from './types';
import { Stack, TextField, Typography, useTheme } from '@mui/material';

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
  const theme = useTheme();

  return (
    <Stack spacing={2}>
      <Typography
        variant="h6"
        color="text.primary"
        style={{
          marginBottom: '0px',
        }}>
        {label}
      </Typography>
      <TextField
        autoFocus={autoFocus}
        inputRef={inputRef}
        style={{
          color: theme.palette.text.primary,
          background: theme.palette.primary.dark,
          marginBottom: '30px',
          marginTop: '0px',
        }}
        inputProps={{
          style: {
            color: 'text.primary',
          },
        }}
        onChange={handleChange}
        value={value}
      />
    </Stack>
  );
};

export default DataFieldTop;
