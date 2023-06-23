import { FC } from 'react';
import { useGetUserInfoQuery } from '@/app/apiSlice';
import { Stack, Typography } from '@mui/material';

import MainPageTemplate from '../../components/MainPageTemplate';
import ProfileForm from './ProfileForm';
import DataBox from '../../components/DataBox';
import NavLink from '../../components/NavLink';
import BreadCrumbs from '@/components/BreadCrumbs';

const ProjectsPage: FC = () => {
  const { data } = useGetUserInfoQuery();
  const breadCrumbItems = ['Profile'];

  return (
    <MainPageTemplate>
      <Stack alignItems={'start'}>
        <BreadCrumbs items={breadCrumbItems} />
        <DataBox width={900} height={550} marginTop={1}>
          <Stack
            margin="auto"
            direction="column"
            justifyContent="center"
            alignItems="center">
            {data ? (
              <ProfileForm user={data}></ProfileForm>
            ) : (
              <Typography>
                User data loading failed. Try again later.
              </Typography>
            )}
            <NavLink color={'error.main'} href="/">
              cancel
            </NavLink>
          </Stack>
        </DataBox>
      </Stack>
    </MainPageTemplate>
  );
};

export default ProjectsPage;
