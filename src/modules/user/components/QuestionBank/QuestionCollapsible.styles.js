import styled from 'styled-components';

export const Container = styled.div`
  // padding: 24px;
  margin: 0;
  width: 98%;
  font-family: "DM Sans";
`;

export const BackButton = styled.button`
  border: none;
  color: #2290ac;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 16px;
  margin-left: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  background-color: #f0f8f1;
  width: 100%;
  padding: 10px;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

export const Tag = styled.div`
  font-size: 14px;
  color: #2290ac;
  margin-bottom: 10px;
  background-color: #f0f8f1;
  width: 12%;
  padding: 10px;
  text-align: center;
  border-radius: 6px;
`;


export const QuestionBox = styled.div`
  padding: 0px;
  border-radius: 8px;
  position: relative;
  width: 100%;
  border: 1px solid #f0f8f1;
  box-sizing: border-box;

  .break{
  display: flex;
  height: 1px;
  width: 98%;
  margin: 10px auto;
  background-color: #ccc;
  box-sizing: border-box;
  }
`;

export const QusnandType = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
    background: #f0f8f1;
    padding: 20px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-sizing: border-box;
    max-width: 100%;
    width: 100%;

    @media (max-width: 768px) {
      padding: 16px;
    }
`;

export const QuestionText = styled.h3`
  font-size: 18px;
  margin: 0 0 12px;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;

export const DifficultyTag = styled.span`
  background-color: ${({ level }) =>
    level === 'Easy' ? '#d4edda' :
    level === 'Medium' ? '#fff3cd' : '#f8d7da'};
  color: ${({ level }) =>
    level === 'Easy' ? '#155724' :
    level === 'Medium' ? '#856404' : '#721c24'};
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 14px;

  @media (max-width: 1024px) {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    padding: 4px 8px;
  }
`;


export const TextInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};
  background-color: ${({ disabled }) => (disabled ? '#f0f0f0' : '#fff')};
  box-sizing: border-box;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;


export const AnswerInput = styled.textarea`
  // width: 100%;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};
  background-color: ${({ disabled }) => (disabled ? '#f0f0f0' : '#fff')};
  box-sizing: border-box;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

export const RadioInput = styled.input`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

export const Footer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  background-color: #ccc;
  color: #fff;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#2290ac')};
`;

export const TryHarder = styled.a`
  font-size: 14px;
  color: #2290ac;
  text-decoration: none;
`;

export const SolutionBox = styled.div`
  margin-top: 24px;
  padding: 16px;
  border-radius: 6px;
  font-size: 15px;
  display: flex;
  flex-direction: column;

  p {
    margin: 8px 0 0 0;

    @media (max-width: 768px) {
      margin: 4px 0 0 0;
    }
  }

  @media (max-width: 1024px) {
    font-size: 14px;
    padding: 10px;
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const SolutionText = styled.span`
  color: #2290ac;
  padding: 5px;
  font-size: 18px;

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SolutionAnswer = styled.span`
  background-color: #f0f8f1;
  padding: 20px;
  border-radius: 6px;
  font-size: 16px;
  word-break: break-word;
  line-height: 1.5;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

export const HelpIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 10px;
  margin-top: 10px;
  font-size: 16px;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;  

export const CodeMeta = styled.div`
  margin: 16px 10px;
  font-size: 14px;
  color: #444;
`;

export const CodeDescription = styled.div`
  margin: 12px 10px;
  font-size: 14px;
    // width: 100%;             
  display: block; 
  
  p {
    margin: 4px 0;
    // width: 100%;
    box-sizing: border-box;
    word-break: break-word;
  }
`;

export const ViewMore = styled.button`
  background: none;
  color: #007bff;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
`;

export const TopicsCovered = styled.div`
  margin: 20px 10px;
  font-size: 14px;
  line-height: 1.5;
`;

export const TopicItem = styled.li`
  margin-left: 20px;
  list-style-type: none;
`;

export const TryCodingButton = styled.button`
  background-color: #2290ac;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 15px;
  border-radius: 6px;
  cursor: pointer;
  margin: 20px;

  @media (max-width: 1024px) {
    font-size: 14px;
    padding: 10px 16px;
    margin: 16px;
  }
`;

export const TextAnswer = styled.textarea`
  width: 98%;
  padding: 12px;
  margin: 12px;
  border-radius: 5px;
  border: 1px solid #cccccc;
  font-size: 16px;
  resize: none;
  cursor: text;
  background-color: #fff;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width: 95%;
  }
`;

export const QusnStatus = styled.div`
  font-size: 14px;
  color: #007bff;
  margin: 20px 10px;
  text-align: right;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PrmngLang = styled.div`
  font-size: 14px;
  color: black;
  margin: 20px 10px;
  text-align: right;
`;
