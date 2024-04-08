import * as constants from './constants';

export interface PeopleState {
  data: Person[];
  loading?: boolean;
  leaderboardData: {};
  message: string;
}

export interface Person {
  bananas: number;
  lastDayPlayed: string;
  longestStreak: number;
  name: string;
  stars: number;
  subscribed: boolean;
  uid: string;
  rank: number;
  highlight: boolean;
}

interface SetLeaderboardDataAction {
  type: typeof constants.SET_LEADERBOARD_DATA;
  payload: {[uid: string]: Person};
}

interface SetSearchedPeopleAction {
  type: typeof constants.SET_SEARCHED_PEOPLE;
  payload: Person[];
}

interface SetSortedDataAction {
  type: typeof constants.SET_SORTED_DATA;
  payload: Person[];
}

interface SetMessageAction {
  type: typeof constants.SET_MESSAGE;
  payload: string;
}

export type PeopleAction =
  | SetLeaderboardDataAction
  | SetSearchedPeopleAction
  | SetSortedDataAction
  | SetMessageAction;
