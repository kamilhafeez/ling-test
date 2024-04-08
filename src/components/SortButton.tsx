import React from 'react';
import styled from 'styled-components/native';

interface SortButtonProps {
  onPress: () => void;
  selected: boolean;
  label: string;
}

const SortButton: React.FC<SortButtonProps> = ({onPress, selected, label}) => {
  return (
    <Button onPress={onPress} selected={selected}>
      <Label selected={selected}>{label}</Label>
    </Button>
  );
};

interface SelectionProps {
  selected: boolean;
}

const Button = styled.TouchableOpacity<SelectionProps>`
  padding: 10px;
  background-color: ${({selected}) => (selected ? '#007bff' : '#fff')};
  border-radius: 5px;
  border: 1px solid ${({selected}) => (selected ? '#007bff' : '#ccc')};
  margin-right: 5px;
`;

const Label = styled.Text<SelectionProps>`
  color: ${({selected}) => (selected ? '#fff' : '#000')};
`;

export default SortButton;
