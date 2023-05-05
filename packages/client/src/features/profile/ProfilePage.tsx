import { FC } from 'react';
import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';
import NavLink from '../../components/NavLink';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/user/userSlice';
import { Stack } from '@mui/material';
import ProfileForm from './ProfileForm';

const ProjectsPage: FC = () => {
  const userState = useAppSelector(selectUser);

  return (
    <MainPageTemplate>
      <DataBox width={800} height={600}>
        <Stack
          margin="auto"
          direction="column"
          justifyContent="center"
          alignItems="center">
          <ProfileForm user={userState.user}></ProfileForm>
          <NavLink href="/">cancel</NavLink>
        </Stack>
      </DataBox>
    </MainPageTemplate>
  );
};

export default ProjectsPage;
