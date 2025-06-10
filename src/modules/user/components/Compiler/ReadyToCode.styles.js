import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const CodeBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

export const LanguageSelect = styled.select`
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const RunButton = styled.button`
  padding: 6px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const InputBox = styled.div`
  margin-top: 16px;
`;

export const TextBox = styled.input`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const OutputBox = styled.div`
  margin-top: 16px;
  padding: 12px;
  border: 1px solid #aaa;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

export const OutputSection = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const OptimiseButton = styled.button`
  margin-top: 12px;
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  margin-top: 12px;
  padding: 6px 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
