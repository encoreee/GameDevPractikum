import { API_ADDRESS, apiFetch } from '@/infrastructure/apiFetch';
import {
  GameResult,
  Leaderboard,
  LeaderboardData,
  LeaderboardParams,
  LeaderboardResponse,
} from './types';
import { handleErrors } from '../errorHandler';

const ENDPOINT = `${API_ADDRESS}/leaderboard`;

const TEAM_NAME = 'galaga-test-2';

const RATING_FIELD_NAME = 'score';

export const LIMIT_BY_PAGE = 5;

export const apiPostUserToLeaderBoard = async (gameResult: GameResult) => {
  try {
    const data: LeaderboardData = {
      data: gameResult,
      ratingFieldName: RATING_FIELD_NAME,
      teamName: TEAM_NAME,
    };
    await apiFetch().post(`${ENDPOINT}`, data);
    return gameResult;
  } catch (e) {
    console.error(e);
  }
};

export const apiGetLeaderboard = async (
  page: number
): Promise<Leaderboard | undefined> => {
  try {
    const cursor = page * LIMIT_BY_PAGE;
    const data: LeaderboardParams = {
      ratingFieldName: RATING_FIELD_NAME,
      cursor,
      limit: LIMIT_BY_PAGE + 1,
    };
    const leaderboard = (await apiFetch()
      .post(`${ENDPOINT}/${TEAM_NAME}`, data)
      .then(handleErrors)
      .then((res) => res.json())) as LeaderboardResponse;

    const res: Leaderboard = {
      page,
      leaderboard,
    };

    return res;
  } catch (e) {
    console.error(e);
  }
};
