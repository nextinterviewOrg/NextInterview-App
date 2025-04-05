import React, { useState } from "react";
import {
  ModalContainer,
  Header,
  ContentWrapper,
  FlashcardLabel,
  TextArea,
  Footer,
  SaveButton,
  CloseButton,
  ModalWrapper
} from "./EditFlashCard.styles";
import { message } from "antd";

const EditFlashCard = ({ card, onClose, onSave }) => {
  const [text, setText] = useState(card.text);

  const handleSave = () => {
    if (text.trim() === "") {
      message.error("Please enter flash card content.");
      return;
    }
    onSave({ ...card, text });
    onClose();
  };

  return (
    <ModalWrapper>
    <ModalContainer>
      <Header>
        Edit Flash Card
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </Header>
      <ContentWrapper>
        <div>
        <div>
        Add flash card content
        </div>
        <FlashcardLabel>Flash Card - {card.id}</FlashcardLabel>
        </div>
        <TextArea
          placeholder="Edit flash card content"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={75}
        />
      </ContentWrapper>
        <div style={{ textAlign: "right" }}>{text.length}/75</div>
      <Footer>
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </Footer>
    </ModalContainer>
    </ModalWrapper>
  );
};

export default EditFlashCard;
