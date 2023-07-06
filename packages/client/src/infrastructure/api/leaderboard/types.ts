export type GameResult = {
  score: number;
  hitRatio: number;
  displayName: string;
};

export type LeaderboardData = {
  data: GameResult;
  ratingFieldName: string;
  teamName: string;
};

export type LeaderboardParams = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type LeaderboardResponse = {
  data: GameResult;
}[];

export type Leaderboard = {
  page: number;
  leaderboard: LeaderboardResponse;
};
