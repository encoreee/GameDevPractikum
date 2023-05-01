import ForumApi from '@/infrastructure/api/forum/ForumApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ForumState } from './types';
import { RootState } from '../store';
import { STATE_STATUSES } from '@/shared/const/store/stateStatuses';

const initialState: ForumState = {
  status: { threadList: null },
};

export const getThreadsList = createAsyncThunk(
  'forum/getThreadList',
  async () => await ForumApi.getThreadList()
);

export const createNewThread = createAsyncThunk(
  'forum/createNewThread',
  async (threadName: string) => await ForumApi.createThread({ threadName })
);

export const getThreadMessages = createAsyncThunk(
  'forum/getThreadMessages',
  async (id: string) => await ForumApi.getThreadMessagesById(id)
);

export const forumSlice = createSlice({
  name: 'forum-slice',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getThreadsList.pending, (state) => {
      state.status.threadList = STATE_STATUSES.LOADING;
    });
    build.addCase(getThreadsList.fulfilled, (state, action) => {
      state.status.threadList = STATE_STATUSES.IDLE;
      state.threadList = action.payload;
    });
    build.addCase(getThreadsList.rejected, (state, action) => {
      state.status.threadList = STATE_STATUSES.LOADING;
      state.threadList = undefined;
      state.error = action.error;
    });
    build.addCase(createNewThread.fulfilled, (state, action) => {
      state.threadList?.unshift({
        ...action.payload,
        id: state.threadList.length.toString(),
      });
    });
  },
});

export const selectThreadList = (state: RootState) => state.forum.threadList;

export const selectThreadListStatus = (state: RootState) =>
  state.forum.status.threadList;

export const selectThreadById = (id: string) => (state: RootState) => {
  return state.forum.threadList?.find((thread) => +thread.id === +id);
};

export default forumSlice.reducer;
