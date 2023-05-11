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
