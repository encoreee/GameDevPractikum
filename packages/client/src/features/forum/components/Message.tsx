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
import {
  deleteThreadMessage,
  getThreadMessages,
  selectReplyedMessages,
} from '@/app/forum/forumSlice';
import { useAppDispatch } from '@/app/hooks';
import { useParams } from 'react-router-dom';
import { NewMessageModal } from './NewMessageModal';
import { useModalWindow } from '@/components/ModalWindow';
import { useSelector } from 'react-redux';

const Message: FC<ThreadMessage & { nestingLevel?: number }> = ({
  time,
  userName,
  userAvatar,
  id,
  content,
  nestingLevel = 0,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const replyedMessages = useSelector(selectReplyedMessages(id));
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

  const modalProps = useModalWindow('Reply');

  const handleMessageReply = () => {
    modalProps.handleOpen();
  };
  console.log(`${nestingLevel * 20}px`);

  return (
    <>
      <Grid
        container
        sx={{ marginLeft: `${nestingLevel * 50}px`, width: 'auto' }}>
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
              <Button
                sx={{ ...greenButtonStyles, fontSize: '0.5rem' }}
                onClick={handleMessageReply}>
                Reply
              </Button>
              <Button
                sx={{ ...greenButtonStyles, fontSize: '0.5rem' }}
                onClick={handleMessageDelete}>
                Delete
              </Button>
              <Typography color={'text.primary'} fontSize={'0.5rem'}>
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
        <NewMessageModal {...modalProps} replyId={id.toString()} />
      </Grid>

      {replyedMessages?.map((item: JSX.IntrinsicAttributes & ThreadMessage) => (
        <Message key={item.id} {...item} nestingLevel={nestingLevel + 1} />
      ))}
    </>
  );
};

export default Message;
