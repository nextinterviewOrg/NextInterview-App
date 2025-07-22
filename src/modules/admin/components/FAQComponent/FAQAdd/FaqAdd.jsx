import React, { useState } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  InputContainer,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  Button,
  ErrorMessage,
  CloseButton, // Import CloseButton
} from "./FaqAdd.style";
import { message } from "antd";

const FaqAdd = ({ onClose, onSave }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState({ question: "", answer: "" });

  // Validate input fields
  const validateForm = () => {
    let isValid = true;
    const newErrors = { question: "", answer: "" };

    if (!question.trim()) {
      newErrors.question = "Please fill the required field.";
      isValid = false;
    }
    if (!answer.trim()) {
      newErrors.answer = "Please fill the required field.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({ question, answer, isVisible: false });
      onClose();
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        {/* Close Button */}
        <CloseButton onClick={onClose}>&times;</CloseButton>

        <ModalHeader>Add FAQ question</ModalHeader>

        {/* Question Input */}
        <InputContainer>
          <Label>Question</Label>
          <div style={{ width: "100%" }}>
            <Input
              type="text"
              placeholder="Type here"
              value={question}
              maxLength={1000}
              onChange={(e) => setQuestion(e.target.value)}
            />
            {errors.question && <ErrorMessage>{errors.question}</ErrorMessage>}
          </div>
        </InputContainer>

        {/* Answer Input */}
        <InputContainer>
          <Label>Answer</Label>
          <div style={{ width: "100%" }}>
            <TextArea
              rows="5"
              placeholder="Type here"
              value={answer}
              maxLength={5000}
              onChange={(e) => setAnswer(e.target.value)}
            />
            {errors.answer && <ErrorMessage>{errors.answer}</ErrorMessage>}
          </div>
        </InputContainer>

        {/* Button Group */}
        <ButtonGroup>
          <Button type="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Upload</Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FaqAdd;
