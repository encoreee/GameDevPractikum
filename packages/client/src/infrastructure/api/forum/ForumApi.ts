import { getData } from './__data';

class ForumApi {
  getThreadList = (): Promise<ForumThreadList> => {
    return new Promise((res) => getData(res, '__forumThreads'));
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createThread: CreateNewThread = ({ threadName }) => {
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
  // getThreadInfoById = (id) => {};
}

export default new ForumApi();
