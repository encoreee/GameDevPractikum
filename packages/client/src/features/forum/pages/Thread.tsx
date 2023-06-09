import { Box, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { useEffect, useMemo } from 'react';
import {
  getThreadMessages,
  getThreadsList,
  selectThreadById,
  selectThreadListStatus,
  selectThreadMessages,
} from '@/app/forum/forumSlice';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import { bottomNavStyles, mainBoxStyles } from '../styles';
import BreadCrumbs, {
  BreadCrumbItem,
  BC_PENDING_SYMBOL,
} from '@/components/BreadCrumbs';
import { useModalWindow } from '@/components/ModalWindow';
import { NewMessageModal } from '../components/NewMessageModal';
import TextButton, { TextButtonVariant } from '@/components/TextButton';
import style from './ScrollBar.module.css';

const ForumThread = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const threadById = useSelector(selectThreadById(id));
  const threadListStatus = useSelector(selectThreadListStatus);
  const threadMessages = useSelector(selectThreadMessages);
  const dispatch = useAppDispatch();
  const newMessage = useModalWindow('New Message');

  useEffect(() => {
    if (!threadListStatus) {
      dispatch(getThreadsList());
    }
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getThreadMessages(id));
    }
  }, [id]);

  const BreadCrumbItems = useMemo<BreadCrumbItem[]>(() => {
    const res: BreadCrumbItem[] = [
      'Forums',
      threadById?.title || BC_PENDING_SYMBOL,
    ];
    return res;
  }, [threadById]);

  const onBack = () => {
    navigate('/forum');
  };

  return (
    <Stack alignItems={'start'} width={'100%'}>
      <BreadCrumbs items={BreadCrumbItems} />
      <Box sx={{ ...mainBoxStyles }} className={style.scrollbar}>
        {threadMessages.map((item) => (
          <Message key={item.id} {...item} />
        ))}
      </Box>
      <Stack sx={bottomNavStyles}>
        <TextButton
          label="&lt;- Back"
          onClick={onBack}
          variant={TextButtonVariant.SECONDARY}
        />
        <TextButton
          label="New Message"
          variant={TextButtonVariant.PRIMARY}
          onClick={newMessage.handleOpen}
        />
      </Stack>
      <NewMessageModal {...newMessage} />
    </Stack>
  );
};

export default ForumThread;
