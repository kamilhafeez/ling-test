import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';

interface MessageModalProps {
  message: string;
  isVisible: boolean;
}

const MessageModal: React.FC<MessageModalProps> = ({message, isVisible}) => {
  const [visible, setModalVisible] = useState<boolean>(isVisible);
  const onClose = () => setModalVisible(false);

  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <ModalContainer>
        <ModalView>
          <ModalText>{message}</ModalText>
          <ModalButton onPress={onClose}>
            <ModalButtonText>Close</ModalButtonText>
          </ModalButton>
        </ModalView>
      </ModalContainer>
    </Modal>
  );
};

export default MessageModal;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const ModalView = styled.View`
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const ModalText = styled.Text`
  margin-bottom: 15px;
  text-align: center;
`;

const ModalButton = styled.TouchableOpacity`
  background-color: #2196f3;
  border-radius: 20px;
  padding: 10px;
  elevation: 2;
`;

const ModalButtonText = styled.Text`
  color: white;
  text-align: center;
`;
