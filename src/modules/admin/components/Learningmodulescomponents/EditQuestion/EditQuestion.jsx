import React, { useRef, useEffect, useState } from 'react';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  FormGroup,
  Label,
  TextArea,
  ButtonGroup,
  SaveButton,
  CancelButton,
  Input
} from './EditQuestion.styles';

const EditQuestion = ({ isOpen, onClose, questionData, onSave,activeTab }) => {
  const modalRef = useRef();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (questionData) {
      setQuestion(questionData.question);
      setAnswer(questionData.answer);
    }
  }, [questionData]);

  const handleSave = () => {
    onSave({ ...questionData, question, answer });
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Edit Question</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <FormGroup>
          <Label>Question</Label>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Answer</Label>
          <TextArea
            rows={5}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </FormGroup>
        <ButtonGroup>
          <CancelButton onClick={onClose}>Reset</CancelButton>
          <SaveButton onClick={handleSave}>Save Changes</SaveButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EditQuestion;
