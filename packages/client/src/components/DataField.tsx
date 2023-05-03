import { Grid, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, FC } from 'react';

type DataFieldVariants = 'label-left' | 'label-top';

export const DATA_FIELD_VARIANTS: Record<string, DataFieldVariants> = {
  LABEL_LEFT: 'label-left',
  LABEL_TOP: 'label-top',
};

export interface DataFieldProps {
  label: string;
  variant?: DataFieldVariants;
  value?: string;
  onChange?: (newValue: string) => void;
}

const DataField: FC<DataFieldProps> = ({
  variant = DATA_FIELD_VARIANTS.LABEL_LEFT,
  ...props
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };
  if (variant === DATA_FIELD_VARIANTS.LABEL_LEFT) {
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
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    );
  } else if (variant === DATA_FIELD_VARIANTS.LABEL_TOP) {
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
          onChange={handleChange}
          value={props.value}
        />
      </Stack>
    );
  }
  return <></>;
};

export default DataField;
