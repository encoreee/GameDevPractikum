import { Grid } from '@mui/material';
import { FunctionComponent } from 'react';

import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';
import DataFieldLT from '../../components/DataFieldLabelOnTop';
import MainButton from '../../components/MainButton';
import NavLink from '../../components/NavLink';

const SignInPage: FunctionComponent = () => {
  return (
    <MainPageTemplate>
      <DataBox width={900} height={510}>
        <Grid
          container
          alignItems="center"
          spacing={4}
          rowSpacing={1}
          width="860px">
          <Grid item xs={6}>
            <DataFieldLT label="name" value="Alex" />
          </Grid>
          <Grid item xs={6}>
            <DataFieldLT label="surname" value="Raykov" />
          </Grid>
          <Grid item xs={6}>
            <DataFieldLT label="email" value="test@test.ru" />
          </Grid>
          <Grid item xs={6}>
            <DataFieldLT label="phone number" value="+7 922 123 4567" />
          </Grid>
          <Grid item xs={6}>
            <DataFieldLT label="password" value="******" />
          </Grid>
          <Grid item xs={6}>
            <DataFieldLT label="repeat password" value="******" />
          </Grid>
        </Grid>
        <MainButton label="Sign up" />
        <NavLink variant="body2" color="white" href="/signup">
          I already have an account
        </NavLink>
      </DataBox>
    </MainPageTemplate>
  );
};

export default SignInPage;
