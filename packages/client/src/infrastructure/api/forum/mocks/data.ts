import { ForumThread, ThreadMessage } from '../types';

const FORUM_TREADS_MOCK = [
  {
    id: '1',
    title: 'New games',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '2',
    title: 'Development',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
  {
    id: '3',
    title: 'Lvl 1',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '4',
    title: 'Love life',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
  {
    id: '5',
    title: 'Fanat',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '6',
    title: 'Razrabi ya vas naydu!!',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
  {
    id: '7',
    title: 'About game',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '8',
    title: 'Level 2 Boss',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
  {
    id: '9',
    title: 'Hmmm',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '10',
    title: 'Anime forum',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
  {
    id: '11',
    title: 'Ribalka',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '12',
    title: 'Ushla jena iz-za vashey igri',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },

  {
    id: '13',
    title: 'MIR TRUD MAY',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '14',
    title: 'Samoletiki',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
];

export const THREAD_MESSAGES_MOCK = (id: string) => [
  {
    id: '1',
    time: 'Tue, 27 Sep 2022 00:00:00 GMT',
    userName: 'Semen Ivanov',
    userAvatar: 'defaultAvatar.svg',
    message: `If you're looking for a game that will transport you back to the golden age of gaming, look no further than [insert game name], a retro gem that's sure to delight fans of classic gaming.
The first thing you'll notice about this game is the nostalgic graphics, which are a loving homage to the 8-bit era. The pixel art is vibrant and colorful, with each level featuring its own unique aesthetic. But don't be fooled by the old-school graphics - this game has plenty of modern touches that make it a blast to play.`,
    threadId: id,
  },
];

const ForumData = {
  FORUM_TREADS_MOCK,
};

export const getData = (
  resolve: (result: typeof ForumData[keyof typeof ForumData]) => void,
  type: keyof typeof ForumData
) => {
  const time = Math.random() * 3000;
  if (type in ForumData) {
    setTimeout(() => resolve(ForumData[type]), time);
    return;
  }
};
