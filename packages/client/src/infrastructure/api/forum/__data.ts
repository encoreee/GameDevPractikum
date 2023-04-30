const __forumThreads: ForumThreadList = [
  {
    id: '1',
    theme: 'New games',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '2',
    theme: 'Development',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
  {
    id: '3',
    theme: 'New games',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '4',
    theme: 'Development',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
  {
    id: '5',
    theme: 'New games',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '6',
    theme: 'Development',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
  {
    id: '7',
    theme: 'New games',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '8',
    theme: 'Development',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
  {
    id: '9',
    theme: 'New games',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '10',
    theme: 'Development',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
  {
    id: '11',
    theme: 'New games',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '12',
    theme: 'Development',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },

  {
    id: '13',
    theme: 'New games',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '14',
    theme: 'Development',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
];

const ForumData = {
  __forumThreads,
};

export const getData = (
  resolve: (...args: unknown[]) => void,
  type: keyof typeof ForumData
) => {
  const time = Math.random() * 3000;
  if (type in ForumData) {
    setTimeout(() => resolve(ForumData[type]), time);
    return;
  }
  resolve();
};
