import {
  createThreadMessages,
  getThreadMessages,
  getThreadsList,
} from '@/app/forum/forumSlice';
import { AppDispatch } from '@/app/store';
import DataField, { DATA_FIELD_VARIANTS } from '@/components/DataField';
import MainButton from '@/components/MainButton';
import ModalWindow, { ModalProps } from '@/components/ModalWindow';
import { Stack } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

export const NewMessageModal: FunctionComponent<
  ModalProps & { replyId?: string }
> = ({ open, handleClose, handleOpen, title, replyId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState<string>('');
  const { id = '' } = useParams();

  const onCreate = async () => {
    if (!message) {
      return;
    }
    try {
      await dispatch(
        createThreadMessages({ TopicId: id, content: message, replyId })
      );

      handleClose();
      setMessage('');

      await dispatch(getThreadMessages(id));
      await dispatch(getThreadsList());

      setSearchParams({ page: '1' });
    } catch (error) {
      console.error(error);
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
            <DataField
              label="Message"
              variant={DATA_FIELD_VARIANTS.LABEL_TOP}
              autoFocus
              onChange={setMessage}
              value={message}
            />
          </>
        )}
        <MainButton label="Create" onClick={onCreate} disabled={!message} />
      </Stack>
    </ModalWindow>
  );
};
