import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ForumThread } from '@/infrastructure/api/forum/types';
import type { FTableBodyProps } from '../types';
import { tableBodyCellStyles, tableBodyRowStyles } from '../styles';
import { formatDateFromUTCString } from '@/shared';
import { STATE_STATUSES } from '@/shared/const';

const TBThreadsSkeleton: FC = () => {
  const tableRows = new Array(9).fill(null);
  const tableCells = new Array(3).fill(null);
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
};

const TBThreadsList: FC<Pick<FTableBodyProps, 'threadList'>> = ({
  threadList,
}) => {
  const navigate = useNavigate();

  const toThread = ({ id }: ForumThread) => {
    navigate(id);
  };
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
};

const TBThreadsListError: FC = () => {
  return (
    <TableBody>
      <TableRow>
        <TableCell>Something went wrong</TableCell>
      </TableRow>
    </TableBody>
  );
};

const TBThreads: FC<FTableBodyProps> = ({ threadListStatus, threadList }) => {
  return threadListStatus === STATE_STATUSES.IDLE ? (
    <TBThreadsList threadList={threadList} />
  ) : threadListStatus === STATE_STATUSES.FAILED ? (
    <TBThreadsListError />
  ) : (
    <TBThreadsSkeleton />
  );
};

export default TBThreads;
