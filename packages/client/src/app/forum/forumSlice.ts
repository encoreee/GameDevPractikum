import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ForumState } from './types';
import { RootState } from '../store';
import { STATE_STATUSES } from '@/shared/const/store/stateStatuses';
import { ForumThread } from '@/infrastructure/api/forum/types';

import { apiFetch, LOCAL_ADDRESS } from '@/infrastructure/apiFetch';
import { isNil } from 'lodash';

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
    const filteredById = data.filter((message: any) => message.TopicId === +id);

    return [...filteredById];
  }
);

export const createThreadMessages = createAsyncThunk(
  'forum/createThreadMessages',
  async (val: {
    TopicId: string;
    content: string;
    replyId?: string;
    userAvatar?: string;
  }) => {
    const { replyId, TopicId, content, userAvatar } = val;

    const res = await apiFetch().post(`${LOCAL_ADDRESS}/api/messages`, {
      TopicId,
      content,
      replyId,
      userAvatar,
    });

    const data = await res.json();

    return data;
  }
);

export const deleteThreadMessage = createAsyncThunk(
  'forum/deleteThreadMessage',
  async (messageId: string) => {
    await apiFetch().delete(`${LOCAL_ADDRESS}/messages/${messageId}`);
  }
);

const initialState: ForumState = {
  status: { threadList: null, createThread: null, threadMessages: null },
  threadMessages: [],
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
      state.status.threadMessages = STATE_STATUSES.LOADING;
    });
    build.addCase(getThreadMessages.rejected, (state) => {
      state.status.threadMessages = STATE_STATUSES.FAILED;
    });
    build.addCase(getThreadMessages.fulfilled, (state, action) => {
      state.status.threadMessages = STATE_STATUSES.IDLE;
      state.threadMessages = [...action.payload];
    });

    build.addCase(createThreadMessages.pending, (state) => {
      state.status.threadMessages = STATE_STATUSES.LOADING;
    });
    build.addCase(createThreadMessages.rejected, (state) => {
      state.status.threadMessages = STATE_STATUSES.FAILED;
    });
    build.addCase(createThreadMessages.fulfilled, (state) => {
      state.status.threadMessages = STATE_STATUSES.IDLE;
    });

    build.addCase(deleteThreadMessage.pending, (state) => {
      state;
    });
    build.addCase(deleteThreadMessage.rejected, (state) => {
      state;
    });
    build.addCase(deleteThreadMessage.fulfilled, (state) => {
      state;
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

export const selectThreadMessages = (state: RootState) => {
  return (
    state.forum.threadMessages.filter((message) => isNil(message.replyId)) || []
  );
};

export const selectReplyedMessages =
  (replyId: number | string) => (state: RootState) => {
    return (
      state.forum.threadMessages.filter((message) => {
        if (message.replyId) {
          return +message.replyId === +replyId;
        }
      }) || []
    );
  };

export default forumSlice.reducer;
