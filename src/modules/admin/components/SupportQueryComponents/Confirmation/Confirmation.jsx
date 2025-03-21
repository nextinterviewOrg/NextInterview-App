import React from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalButtonContainer,
  ModalButton,
  CancelButton,
} from "../../../components/DeleteModule/DeleteModule.styles";

const Confirmation = ({ onClose, onConfirm }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>Are you sure you want to mark this as solved?</ModalTitle>
        <ModalButtonContainer>
          <ModalButton onClick={onConfirm}>Yes</ModalButton>
          <CancelButton onClick={onClose}>No</CancelButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Confirmation;
