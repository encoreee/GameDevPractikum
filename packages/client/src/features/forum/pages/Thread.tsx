import { Paper, Stack } from '@mui/material';
import BreadCrumbs from '@components/BreadCrumbs';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { useEffect } from 'react';
import {
  getThreadsList,
  selectThreadById,
  selectThreadListStatus,
} from '@/app/forum/forumSlice';
import { useSelector } from 'react-redux';

const ForumThread = () => {
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

  return (
    <Stack alignItems={'start'} width={'100%'}>
      <BreadCrumbs items={BreadCrumbItems()} />
      <Paper
        sx={{
          backgroundColor: 'primary.dark',
          width: '100%',
          height: '24rem',
          borderRadius: 0,
          padding: '0 0.875rem 0.875rem',
          overflow: 'auto',
        }}></Paper>
    </Stack>
  );
};

export default ForumThread;
