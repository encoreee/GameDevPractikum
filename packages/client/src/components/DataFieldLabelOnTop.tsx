import { InputLabel } from '@mui/material';
import { FC } from 'react';
import { TextFieldElement } from 'react-hook-form-mui';
import { styled } from '@mui/material/styles';
import { FieldValues, RegisterOptions } from 'react-hook-form-mui';

interface DataFieldProps {
  label: string;
  name?: string;
  value?: string;
  autofocus?: boolean;
  type?: string;
  validation?: Omit<
    RegisterOptions<FieldValues, string>,
    'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
}

const TextFieldStyled = styled(TextFieldElement)({
  '& input:-internal-autofill-previewed': {
    WebkitBoxShadow: '0 0 0 1000px black inset',
    WebkitTextFillColor: 'white',
  },
  '& input:-internal-autofill-selected': {
    WebkitBoxShadow: '0 0 0 1000px black inset',
    WebkitTextFillColor: 'white',
  },
});

const DataField: FC<DataFieldProps> = (props) => {
  return (
    <>
      <InputLabel
        htmlFor={props.label}
        size="normal"
        sx={{
          color: 'primary.main',
          marginBottom: '4px',
          fontSize: 18,
        }}>
        {props.label}
      </InputLabel>
      <TextFieldStyled
        name={props.name || props.label}
        helperText=" "
        sx={{
          width: '100%',
          marginBottom: '10px',
          marginTop: '0px',
        }}
        InputProps={{
          sx: {
            color: 'white',
            background: 'black',
            borderRadius: '0px',
          },
        }}
        FormHelperTextProps={{
          sx: {
            maxWidth: '320px',
            fontSize: '9px',
          },
        }}
        type={props.type || 'text'}
        autoFocus={props.autofocus}
        validation={{
          ...props.validation,
          required: props.validation?.required && 'This field is required',
        }}
      />
    </>
  );
};

export default DataField;
