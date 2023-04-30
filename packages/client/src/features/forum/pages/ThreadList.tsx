import {
  Table,
  Paper,
  Stack,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  SxProps,
  Skeleton,
  Button,
} from '@mui/material';
import BreadCrumbs from '@components/BreadCrumbs';
import { FunctionComponent, useEffect } from 'react';
import {
  getThreadsList,
  selectThreadList,
  selectThreadListStatus,
} from '@/app/forum/forumSlice';
import { useAppDispatch } from '@/app/hooks';
import { useSelector } from 'react-redux';
import { chunk } from 'lodash';
import { formatDateFromUTCString } from '@/shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useModal } from '@/components/ModalWindow';
import { NewThreadModal } from '../components/NewThreadModal';
import { STATE_STATUSES } from '@/shared/const';

const TableCellStyles: SxProps = {
  whiteSpace: 'nowrap',
  padding: '0 0.875rem',
  borderBottom: '0px',
  border: '0px',
};

type FTableBodyProps = {
  threadList?: ForumThreadList;
  threadListStatus: StateStatus;
};

const ForumTableBody: FunctionComponent<FTableBodyProps> = ({
  threadListStatus,
  threadList,
}) => {
  const navigate = useNavigate();

  const TableBodyRowStyles: SxProps = {
    border: '0px',
    '& .forum__table-cell': {
      color: '#fff',
      transition: '0.1s ease-in color',
    },
    '&:hover': {
      border: '0px',
      '& .forum__table-cell': {
        color: 'primary.main',
        cursor: 'pointer',
      },
    },
  };

  const TableBodyCellStyles: SxProps = {
    ...TableCellStyles,
    padding: '0.5rem 1.125rem',
  };

  const toThread = ({ id }: ForumThread) => {
    navigate(id);
  };

  const tableRows = new Array(9).fill(null);
  const tableCells = new Array(3).fill(null);
  if (threadListStatus === STATE_STATUSES.LOADING) {
    return (
      <TableBody>
        {tableRows.map((notNeed, index) => {
          return (
            <TableRow key={index} sx={TableBodyRowStyles}>
              {tableCells.map((notNeed, index) => (
                <TableCell sx={TableBodyCellStyles} key={index}>
                  <Skeleton sx={{ fontSize: '1rem' }} variant="rectangular" />
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    );
  } else if (threadListStatus === STATE_STATUSES.IDLE) {
    return (
      <TableBody>
        {threadList?.map((thread, index) => (
          <TableRow
            key={index}
            sx={TableBodyRowStyles}
            onClick={() => toThread(thread)}>
            <TableCell
              className={'forum__table-cell'}
              sx={TableBodyCellStyles}
              width={'100%'}>
              {thread.theme}
            </TableCell>
            <TableCell
              className={'forum__table-cell'}
              sx={{ ...TableBodyCellStyles, textAlign: 'center' }}>
              {thread.messagesCount}
            </TableCell>
            <TableCell
              className={'forum__table-cell'}
              sx={{ ...TableBodyCellStyles, textAlign: 'center' }}>
              {formatDateFromUTCString(thread.lastUpdate)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  } else if (threadListStatus === STATE_STATUSES.FAILED) {
    return (
      <TableBody>
        <TableRow>
          <TableCell>Something went wrong</TableCell>
        </TableRow>
      </TableBody>
    );
  }
  return <></>;
};

const ForumThreadList: FunctionComponent = () => {
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

  const TableHeadCellStyles: SxProps = {
    ...TableCellStyles,
    paddingTop: '0.875rem',
    color: 'primary.main',
  };

  const ModalProps = useModal('New Theme');

  return (
    <>
      <Stack alignItems={'start'} width={'100%'}>
        <BreadCrumbs items={BreadCrumbItems} />
        <Paper
          sx={{
            backgroundColor: 'primary.dark',
            width: '100%',
            height: '24rem',
            borderRadius: 0,
            padding: '0 0.875rem 0.875rem',
            overflow: 'auto',
          }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={TableHeadCellStyles} width={'100%'}>
                  Themes
                </TableCell>
                <TableCell sx={TableHeadCellStyles}>Messages</TableCell>
                <TableCell sx={TableHeadCellStyles}>Latest update</TableCell>
              </TableRow>
            </TableHead>
            <ForumTableBody
              {...{
                threadList: threadListByPageIdx,
                threadListStatus,
              }}
            />
          </Table>
        </Paper>
        <Stack
          sx={{
            color: '#fff',
            flexDirection: 'row',
            width: '100%',
            marginTop: '0.25rem',
          }}>
          <Button
            variant="text"
            sx={{ textTransform: 'none' }}
            onClick={onBack}>
            {'<- Back'}
          </Button>
          <Stack
            sx={{
              flexDirection: 'row',
              flexGrow: '1',
              justifyContent: 'center',
              gap: '4rem',
            }}>
            <Button
              variant="text"
              disabled={!isPrevPageBtnVisible}
              onClick={onPrevPage}
              sx={{
                textTransform: 'none',
              }}>
              {'< Prev Page'}
            </Button>
            <Button
              variant="text"
              disabled={!isNextPageBtnVisible}
              sx={{ textTransform: 'none' }}
              onClick={onNextPage}>
              {'Next Page >'}
            </Button>
          </Stack>
          <Button
            variant="text"
            sx={{ textTransform: 'none' }}
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
