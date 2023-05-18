import AuthController from '../../controllers/authController';
import { FC } from 'react';
import { Stack } from '@mui/material';
import { FormContainer } from 'react-hook-form-mui';
import { useState } from 'react';
import { SignInRequest } from '../../infrastructure/api/auth/contracts';
import { useNavigate } from 'react-router-dom';

import DataField, { DATA_FIELD_VARIANTS } from '@/components/DataField';
import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';
import MainButton from '../../components/MainButton';
import NavLink from '../../components/NavLink';
import FormNotification, {
  FORM_NOTIFICATION_TYPE,
} from '../../components/FormNotification';

const SignInPage: FC = () => {
  const variant = DATA_FIELD_VARIANTS.LABEL_TOP_RHF;
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
      <DataBox width={400} height={400}>
        <FormContainer
          defaultValues={{ login: '', password: '' }}
          onSuccess={onSubmit}>
          <Stack direction={'column'} width="350px">
            <DataField
              label="login"
              autoFocus
              variant={variant}
              validation={{ required: true }}
            />
            <DataField
              label="password"
              type="password"
              variant={variant}
              validation={{ required: true }}
            />
            <FormNotification
              text={signInError}
              type={FORM_NOTIFICATION_TYPE.ERROR}
            />
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
