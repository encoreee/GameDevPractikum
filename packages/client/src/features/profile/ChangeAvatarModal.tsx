import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Stack, Typography } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { FunctionComponent, useState } from 'react';
import { useUpdateUserAvatarMutation } from '@/app/apiSlice';
import { ErrorData } from '../../infrastructure/api/auth/contracts';
import { AppMessage } from '@/utils/const';

import MainButton from '@/components/MainButton';
import FormNotification, {
  FORM_NOTIFICATION_TYPE,
} from '../../components/Notification';
import ModalWindow, { ModalProps } from '@/components/ModalWindow';

const ChangeAvatarModal: FunctionComponent<ModalProps> = ({
  open,
  handleClose,
  handleOpen,
  title,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [updateUserAvatar, { error }] = useUpdateUserAvatarMutation();

  const updateError = error as FetchBaseQueryError;
  const updateErrorData = updateError?.data as ErrorData | undefined;
  const errorReason = updateErrorData?.reason
    ? updateErrorData.reason
    : AppMessage.UNKNOWN_API_ERROR;

  const handleChange = (newFile: File | null) => {
    setFile(newFile);
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      await updateUserAvatar(formData)
        .unwrap()
        .then(() => handleClose())
        .catch((error) => console.error('Error updating avatar', error));
    }
  };

  return (
    <ModalWindow
      open={open}
      handleClose={handleClose}
      handleOpen={handleOpen}
      title={title}>
      <Stack sx={{ padding: '1rem 4rem' }}>
        {open && (
          <>
            <MuiFileInput
              sx={{ border: '1px solid #c3c3c3', borderRadius: '5px' }}
              id="avatar"
              name="avatar"
              placeholder=" Click to add a file"
              inputProps={{ accept: 'image/png, image/jpeg' }}
              autoFocus
              value={file}
              onChange={handleChange}
            />
          </>
        )}
        <Typography sx={{ cursor: 'default' }}>&nbsp;</Typography>
        <FormNotification
          maxWidth="980px"
          text={updateError ? errorReason : ' '}
          type={FORM_NOTIFICATION_TYPE.ERROR}
        />
        <MainButton label="Save" onClick={handleSubmit} disabled={!file} />
      </Stack>
    </ModalWindow>
  );
};

export default ChangeAvatarModal;
