import React from 'react';
import styled from 'styled-components/native';

interface ButtonProps {
  label: string;
  onPress: () => void;
}
const Button: React.FC<ButtonProps> = ({label, onPress}) => {
  return (
    <Container onPress={onPress}>
      <Label>{label}</Label>
    </Container>
  );
};

export default Button;

const Container = styled.TouchableOpacity`
  background-color: #007aff;
  border-radius: 20px;
  padding: 10px 20px;
  elevation: 2;
`;

const Label = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
`;
