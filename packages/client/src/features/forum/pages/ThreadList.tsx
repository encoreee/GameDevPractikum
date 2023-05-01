import {
  Table,
  Stack,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  SxProps,
  Skeleton,
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
import { formatDateFromUTCString } from '@/shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useModal } from '@/components/ModalWindow';
import { NewThreadModal } from '../components/NewThreadModal';
import { STATE_STATUSES } from '@/shared/const';
import {
  bottomNav,
  cleanButton,
  greenButton,
  mainBox,
  purpleButton,
} from '../styles';

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

  const ModalProps = useModal('New Theme');

  return (
    <>
      <Stack alignItems={'start'} width={'100%'}>
        <BreadCrumbs items={BreadCrumbItems} />
        <Box sx={{ ...mainBox }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeadCellStyles} width={'100%'}>
                  Themes
                </TableCell>
                <TableCell sx={tableHeadCellStyles}>Messages</TableCell>
                <TableCell sx={tableHeadCellStyles}>Latest update</TableCell>
              </TableRow>
            </TableHead>
            <ForumTableBody
              {...{
                threadList: threadListByPageIdx,
                threadListStatus,
              }}
            />
          </Table>
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
            <Button
              variant="text"
              disabled={!isPrevPageBtnVisible}
              onClick={onPrevPage}
              sx={cleanButton}>
              {'<Prev Page'}
            </Button>
            <Button
              variant="text"
              disabled={!isNextPageBtnVisible}
              sx={cleanButton}
              onClick={onNextPage}>
              {'Next Page>'}
            </Button>
          </Stack>
          <Button
            variant="text"
            sx={greenButton}
            onClick={ModalProps.handleOpen}>
            New Theme
          </Button>
        </Stack>
      </Stack>
      <NewThreadModal {...ModalProps} />
    </>
  );
};

type FTableBodyProps = {
  threadList?: ForumThreadList;
  threadListStatus: StateStatus;
};

// Это нормально или все-таки внести в отдельный файл?
const ForumTableBody: FC<FTableBodyProps> = ({
  threadListStatus,
  threadList,
}) => {
  const navigate = useNavigate();

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
            <TableRow key={index} sx={tableBodyRowStyles}>
              {tableCells.map((notNeed, index) => (
                <TableCell sx={tableBodyCellStyles} key={index}>
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
            sx={tableBodyRowStyles}
            onClick={() => toThread(thread)}>
            <TableCell
              className={'forum__table-cell'}
              sx={tableBodyCellStyles}
              width={'100%'}>
              {thread.theme}
            </TableCell>
            <TableCell
              className={'forum__table-cell'}
              sx={{ ...tableBodyCellStyles, textAlign: 'center' }}>
              {thread.messagesCount}
            </TableCell>
            <TableCell
              className={'forum__table-cell'}
              sx={{ ...tableBodyCellStyles, textAlign: 'center' }}>
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

const tableCellStyles: SxProps = {
  whiteSpace: 'nowrap',
  padding: '0 0.875rem',
  borderBottom: '0px',
  border: '0px',
};

const tableBodyRowStyles: SxProps = {
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

const tableHeadCellStyles: SxProps = {
  ...tableCellStyles,
  color: 'primary.main',
};

const tableBodyCellStyles: SxProps = {
  ...tableCellStyles,
  padding: '0.5rem 1.125rem',
};

export default ForumThreadList;
