import {
  Table,
  Stack,
  TableHead,
  TableRow,
  TableCell,
  Box,
} from '@mui/material';
import BreadCrumbs from '@components/BreadCrumbs';
import { FC, useEffect, useMemo } from 'react';
import {
  getThreadsList,
  selectThreadList,
  selectThreadListStatus,
} from '@/app/forum/forumSlice';
import { useAppDispatch } from '@/app/hooks';
import { useSelector } from 'react-redux';
import { chunk } from 'lodash';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useModalWindow } from '@/components/ModalWindow';
import { NewThreadModal } from '../components/NewThreadModal';
import { STATE_STATUSES } from '@/shared/const';
import {
  bottomNavStyles,
  changePageBtnsStyles,
  mainBoxStyles,
  tableHeadCellStyles,
} from '../styles';
import TBThreads from '../components/TBThreads';
import type { ForumThread } from '@/infrastructure/api/forum/types';
import TextButton, { TextButtonVariant } from '@/components/TextButton';

const THREADS_PER_PAGE = 9;

const ForumThreadList: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const threadList = useSelector(selectThreadList);
  const threadListStatus = useSelector(selectThreadListStatus);

  useEffect(() => {
    if (!threadListStatus) {
      dispatch(getThreadsList());
    }
  }, []);

  const [params, setSearchParam] = useSearchParams();

  const currentPagesIdx = params.get('page') || 1;

  const chankedThreadList = useMemo<ForumThread[][]>(() => {
    if (threadList) {
      return chunk(threadList, THREADS_PER_PAGE);
    }
    return [];
  }, [threadList]);

  const lastPageIdx = chankedThreadList.length;

  useEffect(() => {
    if (threadListStatus === STATE_STATUSES.IDLE) {
      if (+currentPagesIdx > lastPageIdx) {
        setSearchParam({ page: lastPageIdx.toString() });
      } else if (+currentPagesIdx < 1) {
        setSearchParam({ page: '1' });
      }
    }
  }, [threadListStatus, currentPagesIdx]);

  const threadListByPageIdx = useMemo<ForumThread[]>(() => {
    if (chankedThreadList) {
      return chankedThreadList[+currentPagesIdx - 1];
    }
    return [];
  }, [chankedThreadList, currentPagesIdx]);

  const onNextPage = () => {
    const nextPageIndex = +currentPagesIdx + 1;
    setSearchParam({ page: nextPageIndex.toString() });
  };

  const onPrevPage = () => {
    const nextPageIndex = +currentPagesIdx - 1;
    setSearchParam({ page: nextPageIndex.toString() });
  };

  const onBack = () => {
    navigate('/');
  };

  const breadCrumbItems = ['Forums'];

  const isPrevPageBtnVisible = +currentPagesIdx !== 1;

  const isNextPageBtnVisible = chankedThreadList[+currentPagesIdx]?.length > 0;

  const modalProps = useModalWindow('New Theme');
  return (
    <>
      <Stack alignItems={'start'} sx={{ width: '100%' }}>
        <BreadCrumbs items={breadCrumbItems} />
        <Box sx={mainBoxStyles}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...tableHeadCellStyles, width: '100%' }}>
                  Themes
                </TableCell>
                <TableCell sx={tableHeadCellStyles}>Messages</TableCell>
                <TableCell sx={tableHeadCellStyles}>Latest update</TableCell>
              </TableRow>
            </TableHead>
            <TBThreads
              threadList={threadListByPageIdx}
              threadListStatus={threadListStatus}
            />
          </Table>
        </Box>
        <Stack sx={bottomNavStyles}>
          <TextButton
            label="&lt;- Back"
            onClick={onBack}
            variant={TextButtonVariant.SECONDARY}
          />
          <Stack sx={changePageBtnsStyles}>
            <TextButton
              label="&lt;Prev Page"
              onClick={onPrevPage}
              variant={TextButtonVariant.CLEAN}
              disabled={!isPrevPageBtnVisible}
            />
            <TextButton
              label="Next Page&gt;"
              onClick={onNextPage}
              variant={TextButtonVariant.CLEAN}
              disabled={!isNextPageBtnVisible}
            />
          </Stack>
          <TextButton
            label="New Theme"
            variant={TextButtonVariant.PRIMARY}
            onClick={modalProps.handleOpen}
          />
        </Stack>
      </Stack>
      <NewThreadModal {...modalProps} />
    </>
  );
};

export default ForumThreadList;
