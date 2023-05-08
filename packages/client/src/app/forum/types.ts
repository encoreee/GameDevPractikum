import { ForumThread, ThreadMessage } from '@infrastructure/api/forum/types';
import { EntityState, SerializedError } from '@reduxjs/toolkit';

export type ForumStatus = {
  threadList: StateStatus;
  createThread: StateStatus;
};

export type ForumState = {
  status: ForumStatus;
  threadList?: ForumThread[];
  threadMessages: EntityState<ThreadMessage[]>;
  error?: SerializedError;
};

// export type
