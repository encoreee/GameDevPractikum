import { STATE_STATUSES } from '@/shared/const';
import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';
import { FC } from 'react';
import { tableBodyCellStyles, tableBodyRowStyles } from '../styles';
import { formatDateFromUTCString } from '@/shared';
import { useNavigate } from 'react-router-dom';

const TBThreads: FC<FTableBodyProps> = ({ threadListStatus, threadList }) => {
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

export default TBThreads;
