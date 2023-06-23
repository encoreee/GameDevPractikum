import { createThreadMessages } from '@/app/forum/forumSlice';
import { AppDispatch } from '@/app/store';
import DataField, { DATA_FIELD_VARIANTS } from '@/components/DataField';
import MainButton from '@/components/MainButton';
import ModalWindow, { ModalProps } from '@/components/ModalWindow';
// import { ForumThread } from '@/infrastructure/api/forum/types';
import { Stack } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

export const NewMessageModal: FunctionComponent<ModalProps> = ({
  open,
  handleClose,
  handleOpen,
  title,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState<string>('');
  const { id } = useParams();

  const onCreate = async () => {
    if (!message) {
      return;
    }
    try {
      //@ts-ignore
      await dispatch(createThreadMessages({ TopicId: id, content: message }));

      console.log(message, id);

      handleClose();
      // setTheme();
      setSearchParams({ page: '1' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalWindow {...{ open, handleClose, handleOpen, title }}>
      <Stack sx={{ padding: '1rem 4rem' }}>
        {open && (
          <>
            <DataField
              label="Message"
              variant={DATA_FIELD_VARIANTS.LABEL_TOP}
              autoFocus
              onChange={(value) => setMessage(value)}
              value={message}
            />
          </>
        )}
        <MainButton label="Create" onClick={onCreate} disabled={!message} />
      </Stack>
    </ModalWindow>
  );
};
