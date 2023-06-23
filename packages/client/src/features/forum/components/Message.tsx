import Avatar from '@/components/Avatar';
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { greenButtonStyles, smallTextStyles, userInfoStyles } from '../styles';
import { ThreadMessage } from '@/infrastructure/api/forum/types';
import { FC, useState } from 'react';
import { formatDateFromUTCString } from '@/shared';
import source from '../../../assets/mainship/MainShipFullHealth.png';
import { deleteThreadMessage, getThreadMessages } from '@/app/forum/forumSlice';
import { useAppDispatch } from '@/app/hooks';
import { useParams } from 'react-router-dom';

const Message: FC<ThreadMessage> = ({
  time,
  userName,
  userAvatar,
  id,
  content,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { id: pageId = '' } = useParams();

  const handleMessageDelete = () => {
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    const messageId = id;
    await dispatch(deleteThreadMessage(`${messageId}`));
    setOpen(false);
    await dispatch(getThreadMessages(pageId));
  };

  return (
    <Grid container>
      <Grid item xs={2}>
        <Stack sx={userInfoStyles}>
          <Avatar src={userAvatar || source} />
          <Typography sx={smallTextStyles}>{userName}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={10}>
        <Stack>
          <Typography sx={smallTextStyles}>{content}</Typography>
          <Stack direction={'row'} alignItems={'center'} gap={'0.5rem'}>
            <Button sx={{ ...greenButtonStyles, fontSize: '0.5rem' }}>
              Reply
            </Button>
            <Button
              sx={{ ...greenButtonStyles, fontSize: '0.5rem' }}
              onClick={handleMessageDelete}>
              Delete
            </Button>
            <Typography color={'primary.main'} fontSize={'0.5rem'}>
              {formatDateFromUTCString(time)}
            </Typography>
          </Stack>
        </Stack>
      </Grid>

      <Modal open={open}>
        <Container sx={{ height: '100%' }}>
          <Stack
            sx={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Typography sx={{ color: '#fff', marginBottom: '30px' }}>
              Confirm Delete
            </Typography>
            <Box sx={{ width: 'fit-content' }}>
              <Button
                sx={{
                  ...greenButtonStyles,
                  fontSize: '2rem',
                  marginRight: '30px',
                }}
                onClick={handleConfirmDelete}>
                Yes
              </Button>
              <Button
                sx={{ ...greenButtonStyles, fontSize: '2rem' }}
                onClick={() => setOpen(false)}>
                No
              </Button>
            </Box>
          </Stack>
        </Container>
      </Modal>
    </Grid>
  );
};

export default Message;
