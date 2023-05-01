import { getData } from './__data';

class ForumApi {
  getThreadList = (): Promise<ForumThreadList> => {
    //@ts-ignore
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getThreadMessagesById = (_id: string) => {
    return new Promise((res) => getData(res, '__threadMessages'));
  };
}

export default new ForumApi();
