import React from 'react';
import {
  ModalOverlay,
  FormContainer,
  FormTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextArea,
  FormSelect,
  SaveButton,
  CloseButton,
  RunCodeButton
} from './AddChallenges.style';
import { FiX } from 'react-icons/fi';

const AddChallenge = ({ onClose }) => {
  return (
    <ModalOverlay>
      <FormContainer>
        <CloseButton onClick={onClose}>
          <FiX size={20} />
        </CloseButton>
        <FormTitle>Add Challenges</FormTitle>

        <FormGroup>
          <FormLabel>Language</FormLabel>
          <FormSelect>
            <option value="">Select Type</option>
            <option value="python">Python</option>
            <option value="sql">SQL</option>
            <option value="question">Question</option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>Question</FormLabel>
          <FormTextArea placeholder="Type here" />
        </FormGroup>

        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormTextArea placeholder="Type here" />
        </FormGroup>

        <FormGroup>
          <FormLabel>Hints</FormLabel>
          <FormTextArea placeholder="Type here" />
        </FormGroup>

        <FormGroup>
          <FormLabel>Input / Queries</FormLabel>
          <FormTextArea placeholder="Type here" />
        </FormGroup>

        <RunCodeButton>Run Code</RunCodeButton>

        <FormGroup>
          <FormLabel>Output</FormLabel>
          <FormTextArea placeholder="Type here" />
        </FormGroup>

        <SaveButton>Save</SaveButton>
      </FormContainer>
    </ModalOverlay>
  );
};

export default AddChallenge;
