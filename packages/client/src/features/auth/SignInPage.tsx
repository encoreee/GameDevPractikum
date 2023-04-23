import { Box } from '@mui/material';
import { FunctionComponent } from 'react';

import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';
import DataFieldLT from '../../components/DataFieldLabelOnTop';
import MainButton from '../../components/MainButton';
import NavLink from '../../components/NavLink';

const SignInPage: FunctionComponent = () => {
  return (
    <MainPageTemplate>
      <DataBox width={400} height={400}>
        <DataFieldLT label="email" value="Alex" />
        <DataFieldLT label="password" value="Raykov" />
        <MainButton label="Sign in" />
        <Box margin={2} width={'80%'}>
          <NavLink href="/signup">I don’t have account</NavLink>
        </Box>
      </DataBox>
    </MainPageTemplate>
  );
};

export default SignInPage;
