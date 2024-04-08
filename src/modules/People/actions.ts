import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import leaderboardData from '../../../src/assets/leaderboard.json';
import * as constants from './constants';
import {
  selectLeaderboardData as getLeaderboardData,
  selectData,
} from './selectors';
import {Person} from './types';
import {State} from '../../types';

export const searchAndRankPeople =
  (searchedName: string): ThunkAction<void, State, null, Action<string>> =>
  (dispatch, getState) => {
    const leaderboard: {[uid: string]: Person} = getLeaderboardData(getState());
    if (!leaderboard) {
      dispatch({
        type: constants.SET_MESSAGE,
        payload: 'Leaderboard data is unavailable.',
      });
      return;
    }

    const sortedPeople = Object.values(leaderboard).sort(
      (a, b) => b.bananas - a.bananas,
    );

    const topTenPeople = sortedPeople.slice(0, 10);
    const searchedUser = sortedPeople.find(person =>
      person.name.toLocaleLowerCase().includes(searchedName.toLowerCase()),
    );

    if (!searchedUser) {
      dispatch({
        type: constants.SET_MESSAGE,
        payload:
          'This user name does not exist! Please specify an existing user name!',
      });
      return;
    }

    const isInTopTen = topTenPeople.some(
      person => person.uid === searchedUser.uid,
    );

    if (!isInTopTen) {
      const overallRank =
        Object.values(leaderboard)
          .sort((a, b) => b.bananas - a.bananas)
          .indexOf(searchedUser) + 1;
      topTenPeople.pop();
      searchedUser.rank = overallRank;
      topTenPeople.push(searchedUser);
    }

    dispatch({
      type: constants.SET_SEARCHED_PEOPLE,
      payload: topTenPeople.map((person, index) => ({
        ...person,
        rank: index + 1,
        highlight: person.uid === searchedUser.uid,
      })),
    });
  };

export const setLeaderboardData = (data: any) => ({
  type: constants.SET_LEADERBOARD_DATA,
  payload: data,
});

export const loadLeaderboardData =
  (): ThunkAction<void, State, null, Action<string>> => dispatch => {
    dispatch(setLeaderboardData(leaderboardData));
  };

export const sortPeople =
  (orderBy: string): ThunkAction<void, State, null, Action<string>> =>
  (dispatch, getState) => {
    const data = selectData(getState());

    const sortedData = [...data].sort((a, b) => {
      if (orderBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        const rankDifference = b.rank - a.rank;
        if (rankDifference === 0) {
          return a.name.localeCompare(b.name);
        }
        return rankDifference;
      }
    });

    dispatch({
      type: constants.SET_SORTED_DATA,
      payload: sortedData,
    });
  };
