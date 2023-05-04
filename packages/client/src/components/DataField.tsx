import { Grid, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, FC, useEffect, useRef } from 'react';

type DataFieldVariants = 'label-left' | 'label-top';

export const DATA_FIELD_VARIANTS: Record<string, DataFieldVariants> = {
  LABEL_LEFT: 'label-left',
  LABEL_TOP: 'label-top',
};

export interface DataFieldProps {
  label: string;
  variant?: DataFieldVariants;
  value?: string;
  autoFocus?: boolean;
  onChange?: (newValue: string) => void;
}

const DataField: FC<DataFieldProps> = ({
  variant = DATA_FIELD_VARIANTS.LABEL_LEFT,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };

  useEffect(() => {
    if (props.autoFocus) {
      inputRef.current?.focus();
    }
  }, []);

  // Это норм?)
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
            inputRef={inputRef}
            autoFocus={props.autoFocus}
            style={{
              backgroundColor: 'black',
            }}
            inputProps={{
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
          value={props.value}
        />
      </Stack>
    );
  }
  return <></>;
};

export default DataField;
