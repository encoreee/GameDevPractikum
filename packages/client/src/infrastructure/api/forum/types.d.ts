type ForumThread = {
  id: string;
  theme: string;
  lastUpdate: Nullable<string>;
  messagesCount: Nullable<number>;
};

type ForumThreadList = ForumThread[];

type threadData = {
  threadName: string;
};

type CreateNewThread = (threadData: threadData) => Promise<ForumThread>;
