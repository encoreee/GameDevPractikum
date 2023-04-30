import {
  Container,
  IconButton,
  Modal,
  Paper,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { PropsWithChildren } from 'react';
import { ReactNode } from 'react';

export interface ModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  title: ReactNode;
}

interface ModalPropsWithChildren extends ModalProps, PropsWithChildren {}

const ModalWindow: FunctionComponent<ModalPropsWithChildren> = ({
  open,
  handleClose,
  title,
  children,
}) => {
  const TitleStyles: SxProps = {
    background: 'linear-gradient(145.51deg, #AC5DD9 7.21%, #004FC4 94.47%);)',
    padding: '0.5rem',
    position: 'relative',
  };

  return (
    <Modal open={open}>
      <Container sx={{ height: '100%' }}>
        <Stack
          sx={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Paper sx={{ width: 'fit-content' }}>
            <Stack
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              sx={TitleStyles}>
              <Typography sx={{ color: '#fff' }}>{title}</Typography>
              <IconButton
                sx={{ position: 'absolute', right: '0.25rem' }}
                onClick={handleClose}>
                <Typography sx={{ color: '#fff', fontSize: '1.25rem' }}>
                  x
                </Typography>
              </IconButton>
            </Stack>
            <Paper sx={{ backgroundColor: 'primary.dark', borderRadius: '0' }}>
              {children}
            </Paper>
          </Paper>
        </Stack>
      </Container>
    </Modal>
  );
};

export default ModalWindow;

export const useModal = (title: ReactNode): ModalProps => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return { open, handleClose, handleOpen, title };
};
