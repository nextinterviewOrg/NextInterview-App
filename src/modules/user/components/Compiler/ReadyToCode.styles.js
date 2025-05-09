import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  width: ${({isCodeEditorVisible}) => (isCodeEditorVisible ? "unset" : "60%")};
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
`;

export const CodeBox = styled.div`
  margin-bottom: 1rem;
`;

export const RunButton = styled.button`
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const OutputBox = styled.div`
  background: #f1f1f1;
  padding: 1rem;
  border-radius: 5px;
`;

export const OutputSection = styled.pre`
  white-space: pre-wrap;
`;

export const LanguageSelect = styled.select`
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 15px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
`;
