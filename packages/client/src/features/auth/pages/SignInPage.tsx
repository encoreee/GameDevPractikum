import AuthController from '../../../controllers/authController';
import { FC } from 'react';
import { Stack } from '@mui/material';
import { FormContainer } from 'react-hook-form-mui';
import { useState, useEffect } from 'react';
import { SignInRequest } from '../../../infrastructure/api/auth/contracts';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppMessage, REDIRECT_URI } from '@/utils/const';
import {
  signInBoxStyles,
  dataBoxStackStyles,
  yandexOauthButtonStyles,
} from '../styles';
import { getOauthLink } from '../helpers/utils';

import DataField, { DATA_FIELD_VARIANTS } from '@/components/DataField';
import MainPageTemplate from '../../../components/MainPageTemplate';
import DataBox from '../../../components/DataBox';
import MainButton from '../../../components/MainButton';
import NavLink from '../../../components/NavLink';
import FormNotification, {
  FORM_NOTIFICATION_TYPE,
} from '../../../components/Notification';

const SignInPage: FC = () => {
  const variant = DATA_FIELD_VARIANTS.LABEL_TOP_RHF;
  const redirectUriEncoded = encodeURIComponent(REDIRECT_URI);
  const navigate = useNavigate();
  const location = useLocation();
  const [signInError, setSignInError] = useState<string>(' ');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const error = searchParams.get('error');

    if (error) {
      setSignInError(decodeURI(error));
    }
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

    window.location.assign(getOauthLink(res.service_id, redirectUriEncoded));
  };

  return (
    <MainPageTemplate>
      <DataBox sx={signInBoxStyles}>
        <FormContainer
          defaultValues={{ login: '', password: '' }}
          onSuccess={onSubmit}>
          <Stack direction={'column'} sx={dataBoxStackStyles}>
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
              sx={yandexOauthButtonStyles}
            />
          </Stack>
        </FormContainer>
        <NavLink variant="body2" href="/signup">
          I don’t have an account
        </NavLink>
      </DataBox>
    </MainPageTemplate>
  );
};

export default SignInPage;
