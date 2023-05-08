import { ForumThread } from '@/infrastructure/api/forum/types';

export type FTableBodyProps = {
  threadList?: ForumThread[];
  threadListStatus: StateStatus;
};
