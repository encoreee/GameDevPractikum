import { Grid, TextField, Typography } from '@mui/material';
import { FC } from 'react';

interface DataFieldProps {
  label: string;
  value?: string;
  onChange?: (newValue: string) => void;
}

const DataField: FC<DataFieldProps> = (props) => {
  return (
    <Grid alignItems="center" margin={1} container spacing={1}>
      <Grid item xs={5}>
        <Typography variant="h6" color="primary.main">
          {props.label}{' '}
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <TextField
          style={{
            backgroundColor: 'black',
          }}
          InputProps={{
            style: {
              color: 'white',
            },
          }}
          defaultValue={props.value}
          onChange={(e) => {
            props.onChange?.(e.target.value);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default DataField;
