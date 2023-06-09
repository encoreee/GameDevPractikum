import AuthController from '../../controllers/authController';
import { FC } from 'react';
import { Stack } from '@mui/material';
import { FormContainer } from 'react-hook-form-mui';
import { useState, useEffect } from 'react';
import { SignInRequest } from '../../infrastructure/api/auth/contracts';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppMessage } from '@/utils/const';

import DataField, { DATA_FIELD_VARIANTS } from '@/components/DataField';
import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';
import MainButton from '../../components/MainButton';
import NavLink from '../../components/NavLink';
import FormNotification, {
  FORM_NOTIFICATION_TYPE,
} from '../../components/FormNotification';

const REDIRECT_URI = 'http://localhost:3000';

const SignInPage: FC = () => {
  const variant = DATA_FIELD_VARIANTS.LABEL_TOP_RHF;
  const redirectUriEncoded = encodeURIComponent(REDIRECT_URI);
  const navigate = useNavigate();
  const location = useLocation();
  const [signInError, setSignInError] = useState<string>(' ');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      setSignInError(error);
    }

    if (!accessToken) {
      return;
    }

    (async () => {
      const error = await AuthController.Oauth({
        code: accessToken,
        redirect_uri: redirectUriEncoded,
      });
      error ? setSignInError(error) : navigate('/');
    })();
  }, [location.search]);

  const onSubmit = async (data: SignInRequest) => {
    const error = await AuthController.signIn(data);

    if (error) {
      setSignInError(error);
      return;
    }

    navigate('/');
  };

  const onOauth = async () => {
    const res = await AuthController.getServiceId(redirectUriEncoded);

    if (!res) {
      setSignInError(AppMessage.OAUTH_ERROR);
      return;
    }

    window.location.assign(
      `https://oauth.yandex.ru/authorize?response_type=code&client_id=${res.service_id}&redirect_uri=${redirectUriEncoded}`
    );
  };

  return (
    <MainPageTemplate>
      <DataBox width={400} height={460}>
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
            <MainButton
              label="Continue with Yandex"
              onClick={onOauth}
              color="#161616"
              fontSize={14}
            />
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
