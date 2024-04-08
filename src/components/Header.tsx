import React from 'react';
import styled from 'styled-components/native';

const Header = () => {
  return (
    <TableHeader>
      <Cell>Name</Cell>
      <Cell>Rank</Cell>
      <Cell>No. of bananas</Cell>
    </TableHeader>
  );
};

export default Header;

const TableHeader = styled.View`
  flex-direction: row;
  background-color: #4caf50;
  margin: 10px 10px 0 10px;
`;
const Cell = styled.Text`
  flex: 1;
  padding: 10px;
  border-width: 1px;
  border-color: #ccc;
  text-align: center;
  color: #fff;
  font-weight: bold;
`;
