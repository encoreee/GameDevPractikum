import { ForumThread, ThreadMessage } from '../types';

const FORUM_TREADS_MOCK: ForumThread[] = [
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
    theme: 'Lvl 1',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '4',
    theme: 'Love life',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
  {
    id: '5',
    theme: 'Fanat',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '6',
    theme: 'Razrabi ya vas naydu!!',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
  {
    id: '7',
    theme: 'About game',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '8',
    theme: 'Level 2 Boss',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
  {
    id: '9',
    theme: 'Hmmm',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '10',
    theme: 'Anime forum',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
  {
    id: '11',
    theme: 'Ribalka',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '12',
    theme: 'Ushla jena iz-za vashey igri',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },

  {
    id: '13',
    theme: 'MIR TRUD MAY',
    lastUpdate: 'Tue, 27 Sep 2022 00:00:00 GMT',
    messagesCount: 12,
  },
  {
    id: '14',
    theme: 'Samoletiki',
    lastUpdate: 'Tue, 21 Jun 2023 00:00:00 GMT',
    messagesCount: null,
  },
];

export const THREAD_MESSAGES_MOCK = (id: string): ThreadMessage[] => [
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
