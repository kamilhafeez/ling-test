import * as selectors from '../../../src/modules/People/selectors';
import {PeopleState} from '../../../src/modules/People/types';
import {State} from '../../../src/types';

describe('Selectors', () => {
  const mockPeopleState: PeopleState = {
    data: [
      {name: 'Kamil', bananas: 100, uid: 'abc'},
      {name: 'Test', bananas: 150, uid: 'xyz'},
    ],
    leaderboardData: {xyz: {name: 'Kamil', bananas: 100, uid: 'abc'}},
    message:
      'This user name does not exist! Please specify an existing user name!',
  };

  const mockState: State = {
    people: mockPeopleState,
  };

  it('selects the people state', () => {
    expect(selectors.selectPeopleState(mockState)).toEqual(mockPeopleState);
  });

  it('selects the leaderboard data', () => {
    expect(selectors.selectLeaderboardData(mockState)).toEqual(
      mockPeopleState.leaderboardData,
    );
  });

  it('selects the data', () => {
    expect(selectors.selectData(mockState)).toEqual(mockPeopleState.data);
  });

  it('selects the message', () => {
    expect(selectors.selectMessage(mockState)).toEqual(mockPeopleState.message);
  });
});
