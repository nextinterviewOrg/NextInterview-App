import styled from "styled-components";
import theme from "../../../../../theme/Theme";

// Modal Overlay
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// Modal Content
export const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  width: 500px;
  padding: 20px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

// Modal Header
export const ModalHeader = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
  /* font-family: ${theme.fonts.body}; */
`;

// Input Container
export const InputContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  width: 90%;
`;

// Label
export const Label = styled.label`
  width: 30%;
  font-size: 14px;
  color: ${theme.colors.textgray};
  margin-top: 10px;
  margin-right: 10px;
  /* font-family: ${theme.fonts.body}; */
`;

// Input
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  /* font-family: ${theme.fonts.body}; */
  border: 1px solid ${theme.colors.textgray};
  border-radius: 5px;
`;

// TextArea
export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  /* font-family: ${theme.fonts.body}; */
  border: 1px solid ${theme.colors.textgray};
  border-radius: 5px;
  resize: none;
`;

// Button Group
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }
`;

// Button
export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.type === "cancel" ? "#ccc" : `${theme.colors.secondary}`)};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

// Error Message (Positioned below Input/TextArea)
export const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

// Close Button (Top Right of Modal)
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.primary};
  }
`;
