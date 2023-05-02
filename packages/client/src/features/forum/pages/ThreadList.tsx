import {
  Table,
  Stack,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Box,
} from '@mui/material';
import BreadCrumbs from '@components/BreadCrumbs';
import { FC, useEffect } from 'react';
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
  cleanButtonStyles,
  greenButtonStyles,
  mainBoxStyles,
  purpleButtonStyles,
  tableHeadCellStyles,
} from '../styles';
import TBThreads from '../components/TBThreads';

const ForumThreadList: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const threadList = useSelector(selectThreadList);
  const threadListStatus = useSelector(selectThreadListStatus);

  useEffect(() => {
    if (!threadListStatus) {
      dispatch(getThreadsList());
    }
  });

  const [params, setSearchParam] = useSearchParams();

  const currentPagesIdx = params.get('page') || 1;

  const threadsPerPage = 9;

  const chankedThreadList = chunk(threadList, threadsPerPage);

  const lastPageIdx = chankedThreadList.length;

  useEffect(() => {
    if (threadListStatus === STATE_STATUSES.IDLE) {
      if (+currentPagesIdx > lastPageIdx) {
        setSearchParam({ page: lastPageIdx.toString() });
      } else if (+currentPagesIdx < 1) {
        setSearchParam({ page: '1' });
      }
    }
  });

  const threadListByPageIdx = chankedThreadList[+currentPagesIdx - 1] || [];

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

  const BreadCrumbItems = ['Forums'];

  const isPrevPageBtnVisible = +currentPagesIdx !== 1;

  const isNextPageBtnVisible = chankedThreadList[+currentPagesIdx]?.length > 0;

  const ModalProps = useModalWindow('New Theme');

  return (
    <>
      <Stack alignItems={'start'} sx={{ width: '100%' }}>
        <BreadCrumbs items={BreadCrumbItems} />
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
              {...{
                threadList: threadListByPageIdx,
                threadListStatus,
              }}
            />
          </Table>
        </Box>
        <Stack sx={bottomNavStyles}>
          <Button variant="text" sx={purpleButtonStyles} onClick={onBack}>
            &lt;- Back
          </Button>
          <Stack sx={changePageBtnsStyles}>
            <Button
              variant="text"
              disabled={!isPrevPageBtnVisible}
              onClick={onPrevPage}
              sx={cleanButtonStyles}>
              &lt;Prev Page
            </Button>
            <Button
              variant="text"
              disabled={!isNextPageBtnVisible}
              sx={cleanButtonStyles}
              onClick={onNextPage}>
              Next Page&gt;
            </Button>
          </Stack>
          <Button
            variant="text"
            sx={greenButtonStyles}
            onClick={ModalProps.handleOpen}>
            New Theme
          </Button>
        </Stack>
      </Stack>
      <NewThreadModal {...ModalProps} />
    </>
  );
};

export default ForumThreadList;
