import React from 'react';
import styled from 'styled-components/native';
import SearchIconImage from '../assets/search.png';

const SearchIcon = () => <Icon source={SearchIconImage} />;

export default SearchIcon;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
