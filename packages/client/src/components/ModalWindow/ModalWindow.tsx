import {
  Container,
  IconButton,
  Modal,
  Box,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import { FunctionComponent } from 'react';
import { PropsWithChildren } from 'react';
import { ModalProps } from './types';

interface ModalPropsWithChildren extends ModalProps, PropsWithChildren {}

const ModalWindow: FunctionComponent<ModalPropsWithChildren> = ({
  open,
  handleClose,
  title,
  children,
}) => {
  return (
    <Modal open={open}>
      <Container sx={{ height: '100%' }}>
        <Stack
          sx={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Box sx={{ width: 'fit-content' }}>
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
            <Box sx={{ backgroundColor: 'primary.main', borderRadius: '0' }}>
              {children}
            </Box>
          </Box>
        </Stack>
      </Container>
    </Modal>
  );
};

const TitleStyles: SxProps = {
  background: 'linear-gradient(145.51deg, #AC5DD9 7.21%, #004FC4 94.47%);)',
  padding: '0.5rem',
  position: 'relative',
};

export default ModalWindow;
