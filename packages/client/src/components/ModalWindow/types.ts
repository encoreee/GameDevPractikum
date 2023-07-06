import { ReactNode } from 'react';

export interface ModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  title: ReactNode;
}
