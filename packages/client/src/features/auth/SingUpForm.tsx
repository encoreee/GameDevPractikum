import AuthController from '../../controllers/authController';
import { FC, useState } from 'react';
import { useWatch, useForm, FormContainer } from 'react-hook-form-mui';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { ValidationScheme } from './SignUpValidationScheme';
import { omit } from 'lodash';

import DataField, { DATA_FIELD_VARIANTS } from '@/components/DataField';
import FormErrorMessage from '../../components/FormErrorMessage';
import MainButton from '../../components/MainButton';

const defaultValues = {
  first_name: '',
  second_name: '',
  email: '',
  login: '',
  phone: '',
  password: '',
  repeatPassword: '',
};

const SignUpForm: FC = () => {
  const variant = DATA_FIELD_VARIANTS.LABEL_TOP_RHF;
  const formContext = useForm<typeof defaultValues>({ defaultValues });
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
          <DataField
            label="name"
            name="first_name"
            autoFocus
            variant={variant}
            validation={ValidationScheme.name}
          />
        </Grid>
        <Grid item xs={6}>
          <DataField
            label="surname"
            name="second_name"
            variant={variant}
            validation={ValidationScheme.surname}
          />
        </Grid>
        <Grid item xs={6}>
          <DataField
            label="email"
            type="email"
            variant={variant}
            validation={{
              required: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <DataField
            label="phone number"
            name="phone"
            variant={variant}
            validation={ValidationScheme.phoneNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <DataField
            label="login"
            variant={variant}
            validation={ValidationScheme.login}
          />
        </Grid>
        <Grid item xs={6}>
          <DataField
            label="password"
            type="password"
            variant={variant}
            validation={ValidationScheme.password}
          />
        </Grid>
        <Grid item xs={6}>
          <DataField
            label="repeat password"
            type="password"
            name="repeatPassword"
            variant={variant}
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
