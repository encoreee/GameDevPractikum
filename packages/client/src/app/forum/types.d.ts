import { SerializedError } from '@reduxjs/toolkit';

type ForumStatus = {
  threadList: StateStatus;
};

type ForumState = {
  status: ForumStatus;
  threadList?: ForumThreadList;
  error?: SerializedError;
};
