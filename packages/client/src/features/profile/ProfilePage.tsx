import { FC } from 'react';
import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';
import NavLink from '../../components/NavLink';
import { useGetUserInfoQuery } from '@/app/apiSlice';
import { Stack } from '@mui/material';
import ProfileForm from './ProfileForm';

const ProjectsPage: FC = () => {
  const { data } = useGetUserInfoQuery();

  return (
    <MainPageTemplate>
      <DataBox width={1000} height={700}>
        <Stack
          margin="auto"
          direction="column"
          justifyContent="center"
          alignItems="center">
          <ProfileForm user={data}></ProfileForm>
          <NavLink href="/">cancel</NavLink>
        </Stack>
      </DataBox>
    </MainPageTemplate>
  );
};

export default ProjectsPage;
