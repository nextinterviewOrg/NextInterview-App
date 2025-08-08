import styled from "styled-components";
import theme from "../../../../../theme/Theme"

export const AssessmentContainer = styled.div`
  width: 846px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: auto;
  height: 500px;
  overflow-y: scroll;
  scrollbar-width: none;
  position: relative;

  .sillheading{
    font-family: "DM Sans";
    font-size: 24px;
  }
`;

export const QuestionWrapper = styled.div`
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
`;

export const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 18px 18px;
  background-color: #f0f8f1;
  font-size: 18px;
  border-radius: 6px;


  .question-index {
    display: flex;
    width: 30px;
    height: 30px;
    background-color: #262524;
    color: #ffffff;
    text-align: center;
   justify-content: center; 
    align-items: center; 
    border-radius: 50%;
    margin-right: 10px;
    font-size: 14px;
  }
`;

export const Option = styled.div`
  margin: 5px 10px;
  font-size: 18px;
  padding: 5px;
  text-align: left;

  input {
    margin-right: 10px;
    accent-color: #68C184;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const SubmitButton = styled.button`
  background-color: ${({disabled}) => (disabled ? `${theme.colors.textgray}` : `${theme.colors.bluetext}45`)};
  color: ${theme.colors.white};
  padding: 8px 20px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};



  &:hover{
    background-color:  ${({disabled}) => (disabled ? `${theme.colors.textgray}` : `${theme.colors.bluetext}`)};
    color: ${theme.colors.white};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export const SkipButton = styled.button`
  color: ${theme.colors.bluetext};
  padding: 8px 20px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  background: ${theme.colors.white};
`;


export const AnswerFeedback = styled.div`
  margin-top: 10px;
  font-weight: bold;
  color: ${({ isCorrect }) => (isCorrect ? "green" : "red")};
`;

export const CorrectAnswer = styled.div`
  margin-top: 8px;
  padding: 8px;
  background-color: #f5f5f5;
  border-left: 3px solid #2290AC;
  font-size: 16px;
`;
export const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  user-select: none;
  margin-bottom: 10px;

  input[type='radio'] {
    appearance: none;
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border: 2px solid #999;
    border-radius: 50%;
    margin: 0;
    position: relative;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    background-color: white;
  }

  input[type='radio']:checked {
    border-color: ${({ theme }) => theme.colors.primary || '#68C184'};
    background-color: white;
  }

  input[type='radio']:checked::before {
    content: '';
    display: block;
    width: 7px;
    height: 7px;
    background-color: ${({ theme }) => theme.colors.primary || '#68C184'};
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 1.5px;
  }
`;
