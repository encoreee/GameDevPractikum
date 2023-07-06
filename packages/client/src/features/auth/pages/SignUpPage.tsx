import { FC } from 'react';
import { signUpBoxStyles } from '../styles';

import SignUpForm from '../components/SignUpForm';
import MainPageTemplate from '../../../components/MainPageTemplate';
import DataBox from '../../../components/DataBox';
import NavLink from '../../../components/NavLink';

const SignUpPage: FC = () => {
  return (
    <MainPageTemplate>
      <DataBox sx={signUpBoxStyles}>
        <SignUpForm />
        <NavLink variant="body2" color="white" href="/signin">
          I already have an account
        </NavLink>
      </DataBox>
    </MainPageTemplate>
  );
};

export default SignUpPage;
