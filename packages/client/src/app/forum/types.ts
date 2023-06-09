import { ForumThread } from '@infrastructure/api/forum/types';
import { EntityState, SerializedError } from '@reduxjs/toolkit';
import { ThreadMessage } from '@infrastructure/api/forum/types';

export type ForumStatus = {
  threadList: StateStatus;
  createThread: StateStatus;
  threadMessages: StateStatus;
};

export interface EntityAdapterInitalState<T> extends EntityState<T> {
  status: StateStatus;
  error: SerializedError;
}

export type ForumState = {
  status: ForumStatus;
  threadList?: ForumThread[];
  threadMessages: ThreadMessage[];
  error?: SerializedError;
};
