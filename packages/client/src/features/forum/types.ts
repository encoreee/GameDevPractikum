import { ForumThread } from '@/infrastructure/api/forum/types';

export type FTableBodyProps = {
  threadList?: ForumThread[];
  threadListStatus: StateStatus;
};

// export type NewThreadType = {
//   id?: string | number;
//   createdAt?: string;
//   updatedAt?: string;
//   UserId?: string | number;
//   title: string;
//   content: string;
// };
