import { ReactNode, useState } from 'react';
import { ModalProps } from './types';

export const useModalWindow = (title: ReactNode): ModalProps => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return { open, handleClose, handleOpen, title };
};
