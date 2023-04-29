import { FunctionComponent } from 'react';

import SignUpForm from './SingUpForm';
import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';
import NavLink from '../../components/NavLink';

const SignUpPage: FunctionComponent = () => {
  return (
    <MainPageTemplate>
      <DataBox width={900} height={650}>
        <SignUpForm />
        <NavLink variant="body2" color="white" href="/signin">
          I already have an account
        </NavLink>
      </DataBox>
    </MainPageTemplate>
  );
};

export default SignUpPage;
