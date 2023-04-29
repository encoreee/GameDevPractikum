import AuthController from '../../controllers/authController';
import { FunctionComponent, useState } from 'react';
import { useWatch, useForm, FormContainer } from 'react-hook-form-mui';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { ValidationScheme } from './SignUpValidationScheme';
import { omit } from 'lodash';

import FormErrorMessage from '../../components/FormErrorMessage';
import MainButton from '../../components/MainButton';
import DataFieldLT from '../../components/DataFieldLabelOnTop';

export const defaultValues = {
  first_name: '',
  second_name: '',
  email: '',
  login: '',
  phone: '',
  password: '',
  repeatPassword: '',
};

const SignUpForm: FunctionComponent = () => {
  const formContext = useForm<typeof defaultValues>();
  const passwordValue = useWatch<typeof defaultValues>({
    name: 'password',
    control: formContext.control,
  });

  const [signUpError, setSignUpError] = useState<string>(' ');
  const navigate = useNavigate();

  const onSubmit = async (data: typeof defaultValues) => {
    const finalData = omit(data, 'repeatPassword');
    const error = await AuthController.signUp(finalData);

    if (error) {
      setSignUpError(error);
      return;
    }

    navigate('/');
  };

  return (
    <FormContainer
      defaultValues={defaultValues}
      onSuccess={onSubmit}
      formContext={formContext}>
      <Grid
        container
        alignItems="center"
        spacing={4}
        rowSpacing={1}
        width="860px">
        <Grid item xs={6}>
          <DataFieldLT
            label="name"
            name="first_name"
            autofocus
            validation={ValidationScheme.name}
          />
        </Grid>
        <Grid item xs={6}>
          <DataFieldLT
            label="surname"
            name="second_name"
            validation={ValidationScheme.surname}
          />
        </Grid>
        <Grid item xs={6}>
          <DataFieldLT
            label="email"
            type="email"
            validation={{
              required: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <DataFieldLT
            label="phone number"
            name="phone"
            validation={ValidationScheme.phoneNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <DataFieldLT label="login" validation={ValidationScheme.login} />
        </Grid>
        <Grid item xs={6}>
          <DataFieldLT
            label="password"
            type="password"
            validation={ValidationScheme.password}
          />
        </Grid>
        <Grid item xs={6}>
          <DataFieldLT
            label="repeat password"
            type="password"
            name="repeatPassword"
            validation={{
              required: true,
              validate: {
                passwordsMatch: (value: string) =>
                  value === passwordValue || 'Passwords do not match',
              },
            }}
          />
        </Grid>
      </Grid>
      <FormErrorMessage maxWidth="830px" errorMessage={signUpError} />
      <MainButton label="Sign up" type="submit" />
    </FormContainer>
  );
};

export default SignUpForm;
