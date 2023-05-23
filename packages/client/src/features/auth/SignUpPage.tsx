import { FC } from 'react';

import SignUpForm from './SingUpForm';
import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';
import NavLink from '../../components/NavLink';

const SignUpPage: FC = () => {
  return (
    <MainPageTemplate>
      <DataBox width={900} height={670}>
        <SignUpForm />
        <NavLink variant="body2" color="white" href="/signin">
          I already have an account
        </NavLink>
      </DataBox>
    </MainPageTemplate>
  );
};

export default SignUpPage;
