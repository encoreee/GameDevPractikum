import { THREAD_MESSAGES_MOCK, getData } from './mocks/data';
import type { CreateNewThread, ForumThread, ThreadMessage } from './types';

const getThreadList = () => {
  return;
  // return new Promise((res) => getData('FORUM_TREADS_MOCK'));
};
const createThread = async (data: any) => {
  // return new Promise((res) =>
  //   setTimeout(
  //     () =>
  //       res({
  //         id: '15',
  //         title: threadName,
  //         lastUpdate: null,
  //         messagesCount: null,
  //       }),
  //     500
  //   )
  // );

  await fetch('http://localhost:3001/api/topics', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

const getThreadMessagesById = (id: string) => {
  return;
  // return new Promise<ThreadMessage[]>((res) => res(THREAD_MESSAGES_MOCK(id)));
};

export const ForumApi = { getThreadList, createThread, getThreadMessagesById };
