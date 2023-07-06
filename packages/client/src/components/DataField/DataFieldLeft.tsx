import { ChangeEvent, FC } from 'react';
import { DataFieldProps } from './types';
import { Grid, TextField, Typography } from '@mui/material';

const DataFieldLeft: FC<DataFieldProps> = ({
  label,
  autoFocus,
  value,
  onChange,
  inputRef,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target?.value);
  };

  return (
    <Grid alignItems="center" margin={1} container spacing={1}>
      <Grid item xs={5}>
        <Typography variant="h6" color="text.primary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <TextField
          inputRef={inputRef}
          autoFocus={autoFocus}
          style={{
            backgroundColor: 'primary.dark',
          }}
          inputProps={{
            style: {
              color: 'text.primary',
            },
          }}
          defaultValue={value}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default DataFieldLeft;
