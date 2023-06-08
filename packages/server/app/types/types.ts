import { EntityState, SerializedError } from '@reduxjs/toolkit';

type StateStatus = null | 'idle' | 'loading' | 'failed';

export type PreloadedState = {
  forum: ForumState;
};

export type ForumStatus = {
  threadList: StateStatus;
  createThread: StateStatus;
};

export interface EntityAdapterInitalState<T> extends EntityState<T> {
  status: StateStatus;
  error: SerializedError;
}

export type ForumState = {
  status: ForumStatus;
  threadList?: ForumThread[];
  threadMessages: EntityAdapterInitalState<ThreadMessage[]>;
  error?: SerializedError;
};

type Nullable<T> = null | T;

export type ForumThread = {
  id: string;
  theme: string;
  lastUpdate: Nullable<string>;
  messagesCount: Nullable<number>;
};

export type threadData = {
  threadName: string;
};

export type CreateNewThread = (threadData: threadData) => Promise<ForumThread>;

export type ThreadMessage = {
  id: string;
  time: string;
  userName: string;
  userAvatar: string;
  message: string;
  threadId: string;
};
