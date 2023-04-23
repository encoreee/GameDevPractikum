import { FunctionComponent } from 'react';

import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';
import DataFieldLT from '../../components/DataFieldLabelOnTop';
import MainButton from '../../components/MainButton';
import NavLink from '../../components/NavLink';

const SignInPage: FunctionComponent = () => {
  return (
    <MainPageTemplate>
      <DataBox width={400} height={380}>
        <DataFieldLT label="email" value="Alex" />
        <DataFieldLT label="password" value="Raykov" />
        <MainButton label="Sign in" />
        <NavLink variant="body2" color="white" href="/signup">
          I don’t have an account
        </NavLink>
      </DataBox>
    </MainPageTemplate>
  );
};

export default SignInPage;
