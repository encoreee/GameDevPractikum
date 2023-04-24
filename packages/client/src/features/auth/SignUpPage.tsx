import { Grid } from '@mui/material';
import { FunctionComponent } from 'react';
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
      <DataBox width={900} height={510}>
        <FormContainer
          defaultValues={{ email: '', password: '' }}
          onSuccess={onSubmit}>
          <Grid
            container
            alignItems="center"
            spacing={4}
            rowSpacing={1}
            width="860px">
            <Grid item xs={6}>
              <DataFieldLT label="name" required autofocus />
            </Grid>
            <Grid item xs={6}>
              <DataFieldLT label="surname" required />
            </Grid>
            <Grid item xs={6}>
              <DataFieldLT label="email" type="email" required />
            </Grid>
            <Grid item xs={6}>
              <DataFieldLT label="phone number" required />
            </Grid>
            <Grid item xs={6}>
              <DataFieldLT label="password" type="password" required />
            </Grid>
            <Grid item xs={6}>
              <DataFieldLT label="repeat password" type="password" required />
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
