import React from 'react';
import styled from 'styled-components/native';
import {Person} from '../modules/People/types';

interface PersonRowProps {
  data: Person;
  index: number;
}

const PersonRow = ({data, index}: PersonRowProps) => {
  return (
    <Row index={index}>
      <Cell highlight={data?.highlight}>{data.name}</Cell>
      <Cell>{data.rank}</Cell>
      <Cell>{data.bananas}</Cell>
    </Row>
  );
};

export default PersonRow;

const Cell = styled.Text<{highlight?: boolean}>`
  flex: 1;
  padding: 10px;
  border-width: 1px;
  border-color: #ccc;
  text-align: center;
  color: ${props => (props.highlight ? '#FF0000' : 'black')};
`;

const Row = styled.View<{index: number}>`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 10px;
  background-color: ${props => (props.index % 2 === 0 ? '#fff' : '#f2f2f2')};
`;
