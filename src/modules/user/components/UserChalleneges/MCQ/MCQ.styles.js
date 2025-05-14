import styled from "styled-components";

export const MCQContainer = styled.div`
  padding: 1rem 2rem;
  margin: auto;
`;

export const Title = styled.h2`
  text-align: left;
  margin-bottom: 2rem;
  margin-top: 0;
  color: ${({ theme }) => theme.colors.text || "#333"};
`;

export const QuestionBlock = styled.div`
  margin-bottom: 1.5rem;
  padding: 0.5rem 1.2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const QuestionText = styled.p`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.8rem;
`;

export const OptionLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  cursor: pointer;
  user-select: none;
`;

export const RadioInput = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  display: block;
  margin: 2rem auto 0 auto;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ResultText = styled.p`
  font-weight: 500;
  margin-top: 0.8rem;
  color: ${(props) => (props.correct ? "green" : "red")};
`;
