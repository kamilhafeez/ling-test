import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';

import {
  loadLeaderboardData,
  searchAndRankPeople,
  sortPeople,
} from './modules/People/actions';
import {selectData, selectMessage} from './modules/People/selectors';
import PersonRow from './components/PersonRow';
import Button from './components/Button';
import Header from './components/Header';
import SearchIcon from './components/SearchIcon';
import MessageModal from './components/MessageModal';
import SortButton from './components/SortButton';

export default function Main() {
  const [keyword, setKeyword] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<'rank' | 'name' | null>(
    null,
  );
  const data = useSelector(selectData);
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLeaderboardData());
  }, [dispatch]);

  const onPress = useCallback(() => {
    dispatch(searchAndRankPeople(keyword));
  }, [keyword, dispatch]);

  const onChangeText = useCallback(
    (text: string) => {
      setKeyword(text.toLowerCase());
    },
    [setKeyword],
  );

  const handleSortPress = (sortType: 'rank' | 'name') => {
    setSelectedSort(prevSortType =>
      prevSortType === sortType ? null : sortType,
    );
    if (selectedSort === sortType) {
      dispatch(searchAndRankPeople(keyword));
    } else {
      dispatch(sortPeople(sortType));
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <SafeAreaView>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{flexGrow: 1}}
            extraScrollHeight={20}
            enableOnAndroid={true}>
            <CenteredView>
              <SearchBarContainer>
                <SearchBar>
                  <SearchIcon />
                  <SearchInput
                    placeholder="Search here..."
                    onChangeText={onChangeText}
                    value={keyword}
                    returnKeyType="search"
                    onSubmitEditing={onPress}
                  />
                </SearchBar>
                <Button label="Search" onPress={onPress} />
              </SearchBarContainer>
            </CenteredView>

            {!!data.length && (
              <>
                <SortButtonsContainer>
                  <SortButton
                    onPress={() => handleSortPress('name')}
                    selected={selectedSort === 'name'}
                    label="Sort by Name"
                  />
                  <SortButton
                    onPress={() => handleSortPress('rank')}
                    selected={selectedSort === 'rank'}
                    label="Sort by Rank"
                  />
                </SortButtonsContainer>
                <FlatList
                  ListHeaderComponent={Header}
                  stickyHeaderIndices={[0]}
                  data={data}
                  scrollEnabled={false}
                  renderItem={({item, index}) => (
                    <PersonRow data={item} index={index} />
                  )}
                  keyExtractor={(item, index) => String(index)}
                />
              </>
            )}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

      <MessageModal message={message} isVisible={!!message.length} />
    </>
  );
}

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SearchBarContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 15px;
`;

const SearchBar = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  flex: 1;
  margin-right: 10px;
  padding: 5px 10px;
  border: 1px solid #ddd;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
`;

const SortButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 10px;
`;
