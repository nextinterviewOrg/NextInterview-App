import React, { useState } from "react";
import {
  Container,
  Header,
  ContentWrapper,
  FlashcardLabel,
  FlashcardNumber,
  TextArea,
  Footer,
  UploadButton,
  CloseButton,
} from "./AddFlashCard.styles";
import { message } from "antd";

const AddFlashCard = ({ onClose, onSave, flashcardCount }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const handleSave = () => {
    if (content.trim() === "") {
      setError(true);
      return;
    }
    onSave({ id: flashcardCount + 1, text: content, know: 0, dontKnow: 0 });
    onClose();
  };

  return (
    <Container>
      <Header>
        Add flash card
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </Header>
      <ContentWrapper>
        <FlashcardLabel>
          <div style={{ marginBottom: "10px" }}>Add flash card content</div>
          <FlashcardNumber>Flash Card - {flashcardCount + 1}</FlashcardNumber>
        </FlashcardLabel>
        <TextArea
          placeholder="Type here"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setError(false);
          }}
          maxLength={50}
          style={{
            borderColor: error ? "red" : "#ccc",
            outline: error ? "1px solid red" : "none",
          }}
        />
        {error && (
          <div style={{ color: "red", marginTop: "5px"}}>
            Please fill the above field.
          </div>
        )}
      </ContentWrapper>
      <span style={{ marginLeft: "160px" }}>{content.length}/50</span>
      <Footer>
        <UploadButton onClick={handleSave}>Save</UploadButton>
      </Footer>
    </Container>
  );
};

export default AddFlashCard;
