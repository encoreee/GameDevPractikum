export type ForumThread = {
  id?: string | number;
  title: string;
  content: string;
  createdAt?: Nullable<string>;
  updatedAt?: Nullable<string>;
  messagesCount?: Nullable<number>;
};

export type threadData = {
  threadName: string;
};

export type CreateNewThread = (threadData: threadData) => Promise<ForumThread>;

export type ThreadMessage = {
  id: number | string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  TopicId?: number | string;
  UserId?: number | string;

  time?: string;
  userName?: string;
  userAvatar?: string;
  message?: string;
  threadId?: string;
};
