import { Grid } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { FormContainer, useWatch, useForm } from 'react-hook-form-mui';
import AuthController from '../../controllers/authController';
import { ValidationScheme } from './SignUpValidationScheme';
import { removeAttrFromObject } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';
import DataFieldLT from '../../components/DataFieldLabelOnTop';
import MainButton from '../../components/MainButton';
import NavLink from '../../components/NavLink';
import FormErrorMessage from '../../components/FormErrorMessage';

const defaultValues = {
  first_name: '',
  second_name: '',
  email: '',
  login: '',
  phone: '',
  password: '',
  repeatPassword: '',
};

const SignInPage: FunctionComponent = () => {
  const formContext = useForm<typeof defaultValues>();
  const passwordValue = useWatch<typeof defaultValues>({
    name: 'password',
    control: formContext.control,
  });
  const [signUpError, setSignUpError] = useState<string>(' ');
  const navigate = useNavigate();

  const onSubmit = async (data: typeof defaultValues) => {
    const finalData = removeAttrFromObject(data, 'repeatPassword');
    const error = await AuthController.signUp(finalData);
    console.log(error);

    if (typeof error === 'string') {
      setSignUpError(error);
      return;
    }

    navigate('/');
  };

  return (
    <MainPageTemplate>
      <DataBox width={900} height={610}>
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
        <NavLink variant="body2" color="white" href="/signin">
          I already have an account
        </NavLink>
      </DataBox>
    </MainPageTemplate>
  );
};

export default SignInPage;
