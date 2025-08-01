import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
`;

export const FormContainer = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

export const FormTitle = styled.h2`
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  // margin-bottom: 16px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100px;
  resize: none;
  box-sizing: border-box;
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
`;

export const RunCodeButton = styled.button`
  background-color: #007c91;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  margin: 16px auto;
  cursor: pointer;
  display: block;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

export const HintButton = styled.button`
  background-color: #007c91;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const HintContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const HintList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const HintItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
`;

export const RemoveHintButton = styled.button`
  background-color: #e74c3c;
  color: white;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
