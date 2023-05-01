import { Box, Button, Stack } from '@mui/material';
import BreadCrumbs from '@components/BreadCrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { useEffect } from 'react';
import {
  getThreadsList,
  selectThreadById,
  selectThreadListStatus,
} from '@/app/forum/forumSlice';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import {
  bottomNav,
  cleanButton,
  greenButton,
  mainBox,
  purpleButton,
} from '../styles';

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
  });

  const BreadCrumbItems = () => ['Forums', threadById?.theme || ''];

  const onBack = () => {
    navigate('/forum');
  };

  return (
    <Stack alignItems={'start'} width={'100%'}>
      <BreadCrumbs items={BreadCrumbItems()} />
      <Box sx={mainBox}>
        <Message />
      </Box>
      <Stack sx={bottomNav}>
        <Button variant="text" sx={purpleButton} onClick={onBack}>
          {'<- Back'}
        </Button>
        <Stack
          sx={{
            flexDirection: 'row',
            flexGrow: '1',
            justifyContent: 'center',
            gap: '4rem',
          }}>
          <Button variant="text" sx={cleanButton}>
            {'<Prev Page'}
          </Button>
          <Button variant="text" sx={cleanButton}>
            {'Next Page>'}
          </Button>
        </Stack>
        <Button variant="text" sx={greenButton}>
          New Message
        </Button>
      </Stack>
    </Stack>
  );
};

export default ForumThread;
