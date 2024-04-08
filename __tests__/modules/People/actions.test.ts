import 'react-native';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../src/modules/People/actions';
import * as constants from '../../../src/modules/People/constants';
import leaderboardData from '../../../src/assets/leaderboard.json';
import {State} from '../../../src/types';

const middlewares = [thunk];
const mockStore = configureMockStore<State>(middlewares);

const initialState: State = {
  people: {
    leaderboardData: leaderboardData,
    data: [],
    message: '',
  },
};

describe('Leaderboard Actions', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('dispatches SET_SEARCHED_PEOPLE with top ten people when searched person is in the top ten', () => {
    const searchedName = 'laila';

    store.dispatch(actions.searchAndRankPeople(searchedName));

    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toContainEqual({
      type: constants.SET_SEARCHED_PEOPLE,
      payload: expect.any(Array),
    });
  });

  it('dispatches SET_MESSAGE when the searched person does not exist', () => {
    const searchedName = 'Kamran';

    store.dispatch(actions.searchAndRankPeople(searchedName));

    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toContainEqual({
      type: constants.SET_MESSAGE,
      payload:
        'This user name does not exist! Please specify an existing user name!',
    });
  });

  it('dispatches SET_LEADERBOARD_DATA when loading leaderboard data', () => {
    store.dispatch(actions.loadLeaderboardData());

    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toContainEqual({
      type: constants.SET_LEADERBOARD_DATA,
      payload: leaderboardData,
    });
  });

  it('dispatches SET_SORTED_DATA when sorting people by name', () => {
    store.dispatch(actions.sortPeople('name'));

    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toContainEqual({
      type: constants.SET_SORTED_DATA,
      payload: expect.any(Array),
    });
  });

  it('dispatches SET_SORTED_DATA when sorting people by rank', () => {
    store.dispatch(actions.sortPeople('rank'));

    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toContainEqual({
      type: constants.SET_SORTED_DATA,
      payload: expect.any(Array),
    });
  });
});
