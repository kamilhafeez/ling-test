import * as constants from './constants';
import {PeopleState, PeopleAction} from './types';

const INITIAL_STATE: PeopleState = {
  data: [],
  leaderboardData: {},
  message: '',
};

export default (state = INITIAL_STATE, action: PeopleAction) => {
  switch (action.type) {
    case constants.SET_LEADERBOARD_DATA:
      return {
        ...state,
        leaderboardData: action.payload,
      };
    case constants.SET_SEARCHED_PEOPLE:
      return {
        ...state,
        data: action.payload,
        message: '',
      };
    case constants.SET_SORTED_DATA:
      return {
        ...state,
        data: action.payload,
        message: '',
      };
    case constants.SET_MESSAGE:
      return {
        ...state,
        data: [],
        message: action.payload,
      };
    default:
      return state;
  }
};
