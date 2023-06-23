import { createNewThread, getThreadsList } from '@/app/forum/forumSlice';
import { AppDispatch } from '@/app/store';
import DataField, { DATA_FIELD_VARIANTS } from '@/components/DataField';
import MainButton from '@/components/MainButton';
import ModalWindow, { ModalProps } from '@/components/ModalWindow';
import { ForumThread } from '@/infrastructure/api/forum/types';
import { Stack } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export const NewThreadModal: FunctionComponent<ModalProps> = ({
  open,
  handleClose,
  handleOpen,
  title,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [, setSearchParams] = useSearchParams();
  const [theme, setTheme] = useState<ForumThread>({
    title: '',
    content: '',
  });

  const onCreate = async () => {
    if (!theme) {
      return;
    }
    try {
      await dispatch(createNewThread(theme));

      await dispatch(getThreadsList());

      handleClose();

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
              label="title"
              variant={DATA_FIELD_VARIANTS.LABEL_TOP}
              autoFocus
              onChange={(value) => setTheme({ ...theme, title: value })}
              value={theme.title}
            />
          </>
        )}
        <MainButton label="Create" onClick={onCreate} disabled={!theme} />
      </Stack>
    </ModalWindow>
  );
};
