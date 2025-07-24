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
  justify-content: flex-end;
  margin-top: 8px;
`;

export const LanguageSelect = styled.select`
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 8px;  
  margin-bottom: 20px;
`;

export const RunButton = styled.button`
  padding: 8px 16px;
  background-color: #2290ac;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 20px;
`;

export const InputBox = styled.div`
  margin-top: 16px;
`;

export const TextBox = styled.input`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Output = styled.div`
  margin: 0px;
`;

export const OutputBox = styled.div`
  margin-top: 0px;
  padding: 12px;
  border-radius: 8px;
  background-color:rgba(189, 178, 178, 0.33);
`;

export const OutputSection = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-x: auto;
  width: 100%;
`;

export const OptimiseButton = styled.button`
  margin-top: 12px;
  padding: 6px 12px;
  background-color: #2290ac;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  margin-top: 12px;
  padding: 10px 14px;
  background-color: #2290ac;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  font-size: 14px;
`;

export const HardandOptimise = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
  margin-top: 12px;
  // padding: 6px 12px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const TryHarderButton = styled.div`
display: flex;
align-items: center;
gap: 4px;
  margin-top: 10px;
  padding: 8px 0px;
  border: none;
  // background-color: #ff7043;
  color: #2290ac;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;
