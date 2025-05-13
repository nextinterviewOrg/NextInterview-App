import styled from "styled-components";

export const ApproachContainer = styled.div`
  padding: 2rem;
`;

export const QuestionCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #e8f0fe;
  }
`;

export const QuestionTitle = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text || "#333"};
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const CustomModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 1001;
  width: 90%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`;

export const ModalContent = styled.div`
  padding: 1.5rem;
  position: relative;
`;

export const CrossIcon = styled.button`
  position: absolute;
  top: 12px;
  right: 15px;
  font-size: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

// export const SelectedQuestionTitle = styled.div`
//   font-size: 20px;
//   font-weight: bold;
//   margin-bottom: 1rem;
// `;

// export const Textarea = styled.textarea`
//   width: 100%;
//   height: 200px;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   resize: none;
//   box-sizing: border-box;
// `;

// export const SubmitButton = styled.button`
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 5px;
//   padding: 10px 20px;
//   cursor: pointer;
// `;

//asdfghjkl;'


export const QuestionPageContainer = styled.div`
  max-width: 90%;
  margin-top: 10px;
  margin-left: 60px;
  padding: 0;
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
`;

export const SelectedQuestionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 0.5rem;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 1rem;
  resize: vertical;
  box-sizing: border-box;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #43a047;
  }
`;

export const BackButton = styled.button`
  margin-bottom: 12px;
  background: none;
  border: none;
  color: #1976d2;
  cursor: pointer;
  font-size: 16px;
  padding: 6px 16px;
  border: 1px solid #1976d2;
  border-radius: 6px;
`;
