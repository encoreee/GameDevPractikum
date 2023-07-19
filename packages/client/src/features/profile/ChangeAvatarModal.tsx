import MainButton from '@/components/MainButton';
import ModalWindow, { ModalProps } from '@/components/ModalWindow';
import { Stack } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { FunctionComponent, useState } from 'react';

const ChangeAvatarModal: FunctionComponent<ModalProps> = ({
  open,
  handleClose,
  handleOpen,
  title,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (newFile: File | null) => {
    setFile(newFile);
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
        <MainButton
          label="Update avatar"
          // onClick={handleSubmit}
          disabled={!file}
        />
      </Stack>
    </ModalWindow>
  );
};

export default ChangeAvatarModal;
