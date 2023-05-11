import { createNewThread } from '@/app/forum/forumSlice';
import { AppDispatch } from '@/app/store';
import DataField, { DATA_FIELD_VARIANTS } from '@/components/DataField';
import MainButton from '@/components/MainButton';
import ModalWindow, { ModalProps } from '@/components/ModalWindow';
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
  const [themeName, setThemeName] = useState('');

  const onChangeThemeName = (newValue: string) => {
    setThemeName(newValue);
  };

  const onCreate = async () => {
    if (!themeName) {
      return;
    }
    try {
      await dispatch(createNewThread(themeName));
      handleClose();
      setThemeName('');
      setSearchParams({ page: '1' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalWindow {...{ open, handleClose, handleOpen, title }}>
      <Stack sx={{ padding: '1rem 4rem' }}>
        {open && (
          <DataField
            label="Theme"
            variant={DATA_FIELD_VARIANTS.LABEL_TOP}
            autoFocus
            onChange={onChangeThemeName}
            value={themeName}
          />
        )}
        <MainButton label="Create" onClick={onCreate} disabled={!themeName} />
      </Stack>
    </ModalWindow>
  );
};
