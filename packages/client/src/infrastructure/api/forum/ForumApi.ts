import { THREAD_MESSAGES_MOCK, getData } from './mocks/data';
import type { CreateNewThread, ForumThread, ThreadMessage } from './types';

const getThreadList = (): Promise<ForumThread[]> => {
  return new Promise((res) => getData(res, 'FORUM_TREADS_MOCK'));
};
const createThread: CreateNewThread = ({ threadName }) => {
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          id: '15',
          theme: threadName,
          lastUpdate: null,
          messagesCount: null,
        }),
      500
    )
  );
};

const getThreadMessagesById = (id: string): Promise<ThreadMessage[]> => {
  return new Promise<ThreadMessage[]>((res) => res(THREAD_MESSAGES_MOCK(id)));
};

export const ForumApi = { getThreadList, createThread, getThreadMessagesById };
