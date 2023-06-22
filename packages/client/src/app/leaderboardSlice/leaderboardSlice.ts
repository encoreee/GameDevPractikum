import {
  LIMIT_BY_PAGE,
  apiGetLeaderboard,
  apiPostUserToLeaderBoard,
} from '@/infrastructure/api/leaderboard/leaderboardApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GameResult } from '@/infrastructure/api/leaderboard/types';
import { STATE_STATUSES } from '@/shared/const';
import { RootState } from '../store';
import { LeaderboardState } from './types';
import { chunk } from 'lodash';

export const postUserToLeaderBoard = createAsyncThunk(
  'leaderboard/postUserToLeaderBoard',
  async (gameResult: GameResult) => await apiPostUserToLeaderBoard(gameResult)
);

export const getLeaderboard = createAsyncThunk(
  'leaderboard/getLeaderboard',
  async (page: number) => {
    return apiGetLeaderboard(page);
  }
);

const initialState: LeaderboardState = {
  leaderboard: {
    isFullfield: false,
    currentPage: -1,
    status: null,
    list: [],
  },
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard-slice',
  initialState,
  reducers: {
    toInitialState: (state) => {
      state.leaderboard = initialState.leaderboard;
    },
  },
  extraReducers: (build) => {
    build.addCase(getLeaderboard.pending, (state) => {
      state.leaderboard.status = STATE_STATUSES.LOADING;
    });
    build.addCase(getLeaderboard.fulfilled, (state, action) => {
      state.leaderboard.status = STATE_STATUSES.IDLE;
      if (action.payload) {
        const leaderboardList = action.payload.leaderboard.map(
          (leaderboard) => leaderboard.data
        );
        state.leaderboard.currentPage = action.payload.page;

        if (leaderboardList.length < LIMIT_BY_PAGE + 1) {
          state.leaderboard.isFullfield = true;
        }

        leaderboardList.pop();
        if (action.payload.page === 0) {
          state.leaderboard.list = leaderboardList;
          return;
        }
        state.leaderboard.list = [
          ...state.leaderboard.list,
          ...action.payload.leaderboard.map((leaderboard) => leaderboard.data),
        ];
      }
    });
    build.addCase(getLeaderboard.rejected, (state) => {
      state.leaderboard.status = STATE_STATUSES.FAILED;
    });
    build.addCase(postUserToLeaderBoard.pending, (state) => {
      state.leaderboard.status = STATE_STATUSES.LOADING;
    });
    build.addCase(postUserToLeaderBoard.rejected, (state) => {
      state.leaderboard.status = STATE_STATUSES.FAILED;
    });
    build.addCase(postUserToLeaderBoard.fulfilled, (state) => {
      state.leaderboard.status = STATE_STATUSES.IDLE;
    });
  },
});

export const leaderboardStatus = (state: RootState) =>
  state.leaderboard.leaderboard.status;

export const leaderboardListByPage = (page: number) => (state: RootState) => {
  const leaderboardList = state.leaderboard.leaderboard.list;
  const listWithIdx = leaderboardList.map((leaderData, index) => ({
    ...leaderData,
    idx: index,
  }));
  return chunk(listWithIdx, LIMIT_BY_PAGE)[page] || [];
};

export const isLeaderboardEmpty = (state: RootState) => {
  return (
    state.leaderboard.leaderboard.status === STATE_STATUSES.IDLE &&
    state.leaderboard.leaderboard.list.length === 0
  );
};

export const isLeaderboardPending = (state: RootState) => {
  return state.leaderboard.leaderboard.status === STATE_STATUSES.LOADING;
};

export const isNeedToDispatchGetLeaderboard =
  (page: number) => (state: RootState) => {
    return state.leaderboard.leaderboard.currentPage < page;
  };

export const isLastLeaderboardPage = (page: number) => (state: RootState) => {
  return (
    state.leaderboard.leaderboard.currentPage === page &&
    state.leaderboard.leaderboard.isFullfield
  );
};

export const { toInitialState: leaderboardToInitialState } =
  leaderboardSlice.actions;

export default leaderboardSlice.reducer;
