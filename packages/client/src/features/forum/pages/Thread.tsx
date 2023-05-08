import { Box, Button, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { useEffect, useMemo } from 'react';
import {
  getThreadMessages,
  getThreadsList,
  selectThreadById,
  selectThreadListStatus,
  selectThreadMessagesById,
} from '@/app/forum/forumSlice';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import {
  bottomNavStyles,
  changePageBtnsStyles,
  cleanButtonStyles,
  greenButtonStyles,
  mainBoxStyles,
  purpleButtonStyles,
} from '../styles';
import BreadCrumbs, {
  BreadCrumbItem,
  BC_PENDING_SYMBOL,
} from '@/components/BreadCrumbs';

const ForumThread = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const threadById = useSelector(selectThreadById(id));
  const threadListStatus = useSelector(selectThreadListStatus);
  const dispatch = useAppDispatch();

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
      threadById?.theme || BC_PENDING_SYMBOL,
    ];
    return res;
  }, [threadById]);

  const onBack = () => {
    navigate('/forum');
  };

  const threadMessages = useSelector(selectThreadMessagesById(id));

  console.log(threadMessages);
  return (
    <Stack alignItems={'start'} width={'100%'}>
      <BreadCrumbs items={BreadCrumbItems} />
      <Box sx={{ ...mainBoxStyles }}>
        {threadMessages.map((item) => (
          <Message key={item.id} {...item} />
        ))}
      </Box>
      <Stack sx={bottomNavStyles}>
        <Button variant="text" sx={purpleButtonStyles} onClick={onBack}>
          &lt;- Back
        </Button>
        <Stack sx={changePageBtnsStyles}>
          <Button variant="text" sx={cleanButtonStyles}>
            &lt;Prev Page
          </Button>
          <Button variant="text" sx={cleanButtonStyles}>
            Next Page&gt;
          </Button>
        </Stack>
        <Button variant="text" sx={greenButtonStyles}>
          New Message
        </Button>
      </Stack>
    </Stack>
  );
};

export default ForumThread;
