import { InputLabel } from '@mui/material';
import { FunctionComponent } from 'react';
import { TextFieldElement } from 'react-hook-form-mui';
import { styled } from '@mui/material/styles';

interface DataFieldProps {
  label: string;
  name?: string;
  value?: string;
  autofocus?: boolean;
  type?: string;
  required?: boolean;
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

const DataField: FunctionComponent<DataFieldProps> = (props) => {
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
          },
        }}
        type={props.type || 'text'}
        required={props.required}
        autoFocus={props.autofocus}
      />
    </>
  );
};

export default DataField;
