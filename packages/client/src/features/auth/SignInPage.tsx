import AuthController from '../../controllers/authController';
import { FunctionComponent } from 'react';
import { Stack } from '@mui/material';
import { FormContainer } from 'react-hook-form-mui';
import { useState } from 'react';
import { SignInRequest } from '../../infrastructure/api/auth/contracts';
import { useNavigate } from 'react-router-dom';

import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';
import DataFieldLT from '../../components/DataFieldLabelOnTop';
import MainButton from '../../components/MainButton';
import NavLink from '../../components/NavLink';
import FormErrorMessage from '../../components/FormErrorMessage';

const SignInPage: FunctionComponent = () => {
  const [signInError, setSignInError] = useState<string>(' ');
  const navigate = useNavigate();

  const onSubmit = async (data: SignInRequest) => {
    const error = await AuthController.signIn(data);

    if (error) {
      setSignInError(error);
      return;
    }

    navigate('/');
  };

  return (
    <MainPageTemplate>
      <DataBox width={400} height={380}>
        <FormContainer
          defaultValues={{ login: '', password: '' }}
          onSuccess={onSubmit}>
          <Stack direction={'column'}>
            <DataFieldLT
              label="login"
              autofocus
              validation={{ required: true }}
            />
            <DataFieldLT
              label="password"
              type="password"
              validation={{ required: true }}
            />
            <FormErrorMessage errorMessage={signInError} />
            <MainButton label="Sign in" type="submit" />
          </Stack>
        </FormContainer>
        <NavLink variant="body2" color="white" href="/signup">
          I don’t have an account
        </NavLink>
      </DataBox>
    </MainPageTemplate>
  );
};

export default SignInPage;
