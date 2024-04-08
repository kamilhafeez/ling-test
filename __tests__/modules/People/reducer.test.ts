import reducer from '../../../src/modules/People/reducer';
import * as constants from '../../../src/modules/People/constants';
import {PeopleState} from '../../../src/modules/People/types';

describe('peopleReducer', () => {
  const initialState: PeopleState = {
    data: [],
    leaderboardData: {},
    message: '',
  };

  it('should handle SET_LEADERBOARD_DATA', () => {
    const leaderboardData = {xyz: {name: 'Kamil', bananas: 100}};
    const action = {
      type: constants.SET_LEADERBOARD_DATA,
      payload: leaderboardData,
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({...initialState, leaderboardData});
  });

  it('should handle SET_SEARCHED_PEOPLE', () => {
    const searchData = [{name: 'Kamil', bananas: 100, uid: 'xyz', rank: 1}];
    const action = {type: constants.SET_SEARCHED_PEOPLE, payload: searchData};
    const state = reducer(initialState, action);
    expect(state).toEqual({...initialState, data: searchData, message: ''});
  });

  it('should handle SET_SORTED_DATA', () => {
    const sortedData = [{name: 'Kamil', bananas: 150, uid: 'abc', rank: 2}];
    const action = {type: constants.SET_SORTED_DATA, payload: sortedData};
    const state = reducer(initialState, action);
    expect(state).toEqual({...initialState, data: sortedData, message: ''});
  });

  it('should handle SET_MESSAGE', () => {
    const message =
      'This user name does not exist! Please specify an existing user name!';
    const action = {type: constants.SET_MESSAGE, payload: message};
    const state = reducer(initialState, action);
    expect(state).toEqual({...initialState, data: [], message});
  });
});
