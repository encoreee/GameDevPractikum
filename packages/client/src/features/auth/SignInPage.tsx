import { FunctionComponent } from 'react';
import { Stack } from '@mui/material';
import { FormContainer } from 'react-hook-form-mui';

import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';
import DataFieldLT from '../../components/DataFieldLabelOnTop';
import MainButton from '../../components/MainButton';
import NavLink from '../../components/NavLink';

const SignInPage: FunctionComponent = () => {
  const onSubmit = (data: any) => console.log(data);

  return (
    <MainPageTemplate>
      <DataBox width={400} height={380}>
        <FormContainer
          defaultValues={{ email: '', password: '' }}
          onSuccess={onSubmit}>
          <Stack direction={'column'}>
            <DataFieldLT
              label="email"
              type="email"
              autofocus
              validation={{ required: true }}
            />
            <DataFieldLT
              label="password"
              type="password"
              validation={{ required: true }}
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
