import {
  ForumApi,
  // , apiFetch
} from '@/infrastructure/api/forum/ForumApi';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { EntityAdapterInitalState, ForumState } from './types';
import { RootState } from '../store';
import { STATE_STATUSES } from '@/shared/const/store/stateStatuses';
import { ForumThread, ThreadMessage } from '@/infrastructure/api/forum/types';

import { apiFetch } from '@/infrastructure/apiFetch';

const LOCAL_ADDRESS = 'http://localhost:3001';

export const getThreadsList = createAsyncThunk(
  'forum/getThreadList',
  async () => {
    const res = await apiFetch().get(`${LOCAL_ADDRESS}/api/topics`);
    const data = await res.json();

    return data;
  }
);

export const createNewThread = createAsyncThunk(
  'forum/createNewThread',
  async (data: ForumThread) => {
    const body = { ...data };

    await apiFetch().post(`${LOCAL_ADDRESS}/api/topics`, body);

    return body;
  }
);

export const getThreadMessages = createAsyncThunk(
  'forum/getThreadMessages',
  async (id: string) => {
    const res = await apiFetch().get(`${LOCAL_ADDRESS}/api/messages`);
    const data = await res.json();

    console.log(data);

    return data;
  }
);

export const createThreadMessages = createAsyncThunk(
  'forum/createThreadMessages',
  async (val: { TopicId: string; content: string }) => {
    const { TopicId, content } = val;

    const res = await apiFetch().post(`${LOCAL_ADDRESS}/api/messages`, {
      TopicId,
      content,
    });
    const data = await res.json();

    return data;
  }
);

export const threadMessagesAdapter = createEntityAdapter<ThreadMessage[]>({
  selectId: (message) => {
    console.log(message);
    return message[0].id;
  },
});

// console.log(threadMessagesAdapter);

const initialState: ForumState = {
  status: { threadList: null, createThread: null },
  threadMessages: threadMessagesAdapter.getInitialState({
    status: null,
    error: '',
  }) as EntityAdapterInitalState<ThreadMessage[]>,
};

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
    build.addCase(createNewThread.pending, (state) => {
      state.status.createThread = STATE_STATUSES.LOADING;
    });
    build.addCase(createNewThread.rejected, (state) => {
      state.status.createThread = STATE_STATUSES.FAILED;
    });
    build.addCase(createNewThread.fulfilled, (state, action) => {
      state.threadList?.unshift({
        ...action.payload,
      });
    });
    build.addCase(getThreadMessages.pending, (state) => {
      state.threadMessages.status = STATE_STATUSES.LOADING;
    });
    build.addCase(getThreadMessages.rejected, (state) => {
      state.threadMessages.status = STATE_STATUSES.FAILED;
    });
    build.addCase(getThreadMessages.fulfilled, (state, action) => {
      state.threadMessages.status = STATE_STATUSES.IDLE;
      threadMessagesAdapter.addOne(state.threadMessages, action.payload);
    });

    build.addCase(createThreadMessages.pending, (state) => {
      console.log('pending');
      state.threadMessages.status = STATE_STATUSES.LOADING;
    });
    build.addCase(createThreadMessages.rejected, (state) => {
      console.log('rejected');
      state.threadMessages.status = STATE_STATUSES.FAILED;
    });
    build.addCase(createThreadMessages.fulfilled, (state, action) => {
      console.log('fulfilled');
      state.threadMessages.status = STATE_STATUSES.IDLE;
      threadMessagesAdapter.addOne(state.threadMessages, action.payload);
    });
  },
});

export const selectThreadList = (state: RootState) => state.forum.threadList;

export const selectThreadListStatus = (state: RootState) =>
  state.forum.status.threadList;

export const selectThreadById = (id: string) => (state: RootState) => {
  return state.forum.threadList?.find((thread) => {
    if (thread.id) {
      return +thread.id === +id;
    }
  });
};

export const selectForumState = () => (state: RootState) => {
  return state.forum;
};

const threadMessagesSelectors = threadMessagesAdapter.getSelectors();

export const selectThreadMessagesById = (id: string) => (state: RootState) =>
  threadMessagesSelectors.selectById(state?.forum.threadMessages, id) || [];

export default forumSlice.reducer;
