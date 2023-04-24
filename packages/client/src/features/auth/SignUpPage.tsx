import { Grid } from '@mui/material';
import { FunctionComponent } from 'react';
import { FormContainer, useWatch, useForm } from 'react-hook-form-mui';
import { ValidationAssertions } from '../../utils/const';

import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';
import DataFieldLT from '../../components/DataFieldLabelOnTop';
import MainButton from '../../components/MainButton';
import NavLink from '../../components/NavLink';

const {
  onlyCyrillicLatinAndDash,
  firstLetterUpper,
  onlyNumbersAndPlus,
  atLeastOneNumber,
  atLeastOneUppercase,
  atLeastOneLowercase,
} = ValidationAssertions;

const defaultValues = {
  name: '',
  surname: '',
  email: '',
  phoneNumber: '',
  password: '',
  repeatPassword: '',
  test: '',
};

const ValidationScheme = {
  name: {
    required: true,
    maxLength: {
      value: 40,
      message: 'Maximum 40 characters',
    },
    validate: {
      onlyCyrillicLatinAndDash,
      firstLetterUpper,
    },
  },
  surname: {
    required: true,
    maxLength: {
      value: 40,
      message: 'Maximum 40 characters',
    },
    validate: {
      onlyCyrillicLatinAndDash,
      firstLetterUpper,
    },
  },
  phoneNumber: {
    required: true,
    validate: {
      onlyNumbersAndPlus,
    },
  },
  password: {
    required: true,
    minLength: {
      value: 8,
      message: 'Minimum 8 characters',
    },
    maxLength: {
      value: 40,
      message: 'Maximum 40 characters',
    },
    validate: {
      atLeastOneLowercase,
      atLeastOneUppercase,
      atLeastOneNumber,
    },
  },
};

const SignInPage: FunctionComponent = () => {
  const formContext = useForm<typeof defaultValues>();
  const passwordValue = useWatch<typeof defaultValues>({
    name: 'password',
    control: formContext.control,
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <MainPageTemplate>
      <DataBox width={900} height={510}>
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
                autofocus
                validation={ValidationScheme.name}
              />
            </Grid>
            <Grid item xs={6}>
              <DataFieldLT
                label="surname"
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
                validation={ValidationScheme.phoneNumber}
              />
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
                  validate: {
                    passwordsMatch: (value: string) =>
                      value === passwordValue || 'Passwords do not match',
                  },
                }}
              />
            </Grid>
          </Grid>
          <MainButton label="Sign up" type="submit" />
        </FormContainer>
        <NavLink variant="body2" color="white" href="/signup">
          I already have an account
        </NavLink>
      </DataBox>
    </MainPageTemplate>
  );
};

export default SignInPage;
