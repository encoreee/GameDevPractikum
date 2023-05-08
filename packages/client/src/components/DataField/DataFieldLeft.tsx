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
    if (onChange) {
      onChange(event.target?.value);
    }
  };

  return (
    <Grid alignItems="center" margin={1} container spacing={1}>
      <Grid item xs={5}>
        <Typography variant="h6" color="primary.main">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <TextField
          inputRef={inputRef}
          autoFocus={autoFocus}
          style={{
            backgroundColor: 'black',
          }}
          inputProps={{
            style: {
              color: 'white',
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
