import { FC } from 'react';
import { useGetUserInfoQuery } from '@/app/apiSlice';
import { Stack, Typography } from '@mui/material';
import { useModalWindow } from '@/components/ModalWindow';

import MainPageTemplate from '../../components/MainPageTemplate';
import ProfileForm from './ProfileForm';
import DataBox from '../../components/DataBox';
import NavLink from '../../components/NavLink';
import BreadCrumbs from '@/components/BreadCrumbs';
import TextButton, { TextButtonVariant } from '@/components/TextButton';
import Avatar, { AvatarSize } from '@/components/Avatar';
import ChangeAvatarModal from './ChangeAvatarModal';

const ProjectsPage: FC = () => {
  const { data } = useGetUserInfoQuery();

  const modalProps = useModalWindow('Change avatar');
  const breadCrumbItems = ['Profile'];

  const onChangeAvatarClick = () => {
    modalProps.handleOpen();
  };

  const onConfirmAvatarChange = () => {
    modalProps.handleClose();
  };

  return (
    <MainPageTemplate>
      <Stack alignItems={'start'}>
        <BreadCrumbs items={breadCrumbItems} />
        <DataBox width={900} height={750} marginTop={1}>
          <Stack
            margin="auto"
            direction="column"
            justifyContent="center"
            alignItems="center">
            <Typography sx={{ cursor: 'default' }}>&nbsp;</Typography>
            <Avatar avatarSize={AvatarSize.BIG} />
            <TextButton
              label={'Change'}
              variant={TextButtonVariant.PRIMARY}
              fontSize={12}
              onClick={onChangeAvatarClick}
            />
            <Typography sx={{ cursor: 'default' }}>&nbsp;</Typography>
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
      <ChangeAvatarModal {...modalProps} replyId={`123`} />
    </MainPageTemplate>
  );
};

export default ProjectsPage;
