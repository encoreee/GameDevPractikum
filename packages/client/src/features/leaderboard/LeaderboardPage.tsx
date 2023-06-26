import { FC, useEffect, useMemo, useState } from 'react';

import MainPageTemplate from '../../components/MainPageTemplate';

import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/app/hooks';
import { cleanButtonStyles, purpleButtonStyles } from '../forum/styles';
import { useNavigate } from 'react-router-dom';
import {
  getLeaderboard,
  isLeaderboardEmpty,
  isLastLeaderboardPage,
  isNeedToDispatchGetLeaderboard,
  isLeaderboardPending,
  leaderboardListByPage,
  leaderboardToInitialState,
} from '@/app/leaderboardSlice/leaderboardSlice';

const styles = {
  content: {
    color: 'white',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '700px',
    padding: '0px',
  },
  mainText: {
    fontSize: '24px',
  },
  text: {
    fontSize: '16px',
    span: {
      position: 'relative',
      cursor: 'pointer',
      padding: '10px',
      whiteSpace: 'nowrap',
      '&:hover': {
        textDecorationLine: 'underline',
      },
    },
  },
  backText: {
    cursor: 'pointer',
    fontSize: '12px',
    background: 'linear-gradient(145.51deg, #AC5DD9 7.21%, #004FC4 94.47%)',
    textFillColor: 'transparent',
    backgroundClip: 'text',
  },
  gridStyle: { width: '680px', height: '69px' },
  gridContainer: {
    backgroundColor: 'primary.dark',
    color: 'white',
    width: 700,
    height: 400,
  },
};

const LeaderBoardPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);

  const onBack = () => {
    navigate('/');
  };
  const leadersByPage = useSelector(leaderboardListByPage(page));

  const isEmpty = useSelector(isLeaderboardEmpty);

  const isPending = useSelector(isLeaderboardPending);

  const onNextPage = () => {
    if (!isPending) {
      setPage(page + 1);
    }
  };

  const onPrevPage = () => {
    if (!isPending) {
      setPage(page - 1);
    }
  };
  const isLastPage = useSelector(isLastLeaderboardPage(page));

  const isFirstPage = useMemo(() => page === 0, [page]);

  const isNeedToDispatch = useSelector(isNeedToDispatchGetLeaderboard(page));

  useEffect(() => {
    if (isNeedToDispatch && !isLastPage) {
      dispatch(getLeaderboard(page));
    }
  }, [page]);

  useEffect(
    () => () => {
      dispatch(leaderboardToInitialState());
    },
    []
  );

  const PendingLeaderList = () => (
    <>
      {[...Array(5).keys()].map((index) => {
        return (
          <Grid
            container
            alignItems="center"
            margin={1}
            spacing={2}
            sx={styles.gridStyle}
            key={index}>
            <Grid item xs={2}>
              <Skeleton height={'40px'} />
            </Grid>
            <Grid item xs={8}>
              <Skeleton height={'40px'} />
            </Grid>
            <Grid item xs={2}>
              <Skeleton height={'40px'} />
            </Grid>
          </Grid>
        );
      })}
    </>
  );

  const LeaderList = () => (
    <>
      {leadersByPage.map((leader) => {
        return (
          <Grid
            container
            alignItems="center"
            margin={1}
            spacing={2}
            sx={styles.gridStyle}
            key={leader.idx + leader?.displayName + leader?.score}>
            <Grid item xs={2}>
              <Typography sx={styles.text}>{leader.idx + 1}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography sx={styles.text}>{leader.displayName}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={styles.text}>{leader?.score}</Typography>
            </Grid>
          </Grid>
        );
      })}
    </>
  );

  const EmptyList = () => (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100%'}>
      <Typography> No leaders yet, be the first</Typography>
    </Box>
  );

  const Leaderboard = () => {
    if (isPending) {
      return <PendingLeaderList />;
    } else if (isEmpty) {
      return <EmptyList />;
    } else {
      return <LeaderList />;
    }
  };

  return (
    <MainPageTemplate>
      <Container style={styles.content}>
        <Typography sx={styles.mainText}>Leaders</Typography>
      </Container>

      <Box sx={styles.gridContainer}>
        <Leaderboard />
      </Box>

      <Container style={styles.content}>
        <Button variant="text" sx={purpleButtonStyles} onClick={onBack}>
          &lt;- Back
        </Button>
        <Box display={'flex'} gap={'1rem'}>
          <Button
            sx={cleanButtonStyles}
            onClick={onPrevPage}
            disabled={isFirstPage}>
            &lt; Previous page
          </Button>
          <Button
            sx={cleanButtonStyles}
            onClick={onNextPage}
            disabled={isLastPage}>
            Next page &gt;
          </Button>
        </Box>
      </Container>
    </MainPageTemplate>
  );
};

export default LeaderBoardPage;
