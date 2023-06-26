import { FC, useEffect, useMemo, useState } from 'react';
import MainPageTemplate from '../../components/MainPageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import TextButton, { TextButtonVariant } from '@/components/TextButton';

import { Box, Container, Grid, Skeleton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/app/hooks';
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
    color: 'text.primary',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '700px',
    padding: '0px',
  },
  text: {
    color: 'text.primary',
    fontSize: 14,
    cursor: 'default',
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
  gridStyle: { width: '680px', height: '69px' },
  gridContainer: {
    backgroundColor: 'primary.main',
    color: 'text.primary',
    width: 700,
    height: 400,
  },
};

const LeaderBoardPage: FC = () => {
  const navigate = useNavigate();
  const breadCrumbItems = ['Leaders'];
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
        <BreadCrumbs items={breadCrumbItems} />
        <Typography sx={styles.text}>
          Sort by: <span>score</span>|<span>name</span>
        </Typography>
      </Container>
      <Box sx={styles.gridContainer}>
        <Leaderboard />
      </Box>

      <Container style={styles.content}>
        <TextButton
          label="&lt;- Back"
          onClick={onBack}
          variant={TextButtonVariant.SECONDARY}
        />

        <Box display={'flex'} gap={'1rem'}>
          <TextButton
            label="&lt;Prev Page"
            variant={TextButtonVariant.CLEAN}
            onClick={onPrevPage}
            disabled={isFirstPage}
          />
          <TextButton
            label="Next Page&gt;"
            variant={TextButtonVariant.CLEAN}
            onClick={onNextPage}
            disabled={isLastPage}
          />
        </Box>
      </Container>
    </MainPageTemplate>
  );
};

export default LeaderBoardPage;
