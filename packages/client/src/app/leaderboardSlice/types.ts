import { GameResult } from '@/infrastructure/api/leaderboard/types';

export type LeaderboardState = {
  leaderboard: {
    isFullfield: boolean;
    currentPage: number;
    status: StateStatus;
    list: GameResult[];
  };
};
