import {State} from '../../types';

export const selectPeopleState = (state: State) => state.people;
export const selectLeaderboardData = (state: State) =>
  selectPeopleState(state).leaderboardData;
export const selectData = (state: State) => selectPeopleState(state).data;
export const selectMessage = (state: State) => selectPeopleState(state).message;
