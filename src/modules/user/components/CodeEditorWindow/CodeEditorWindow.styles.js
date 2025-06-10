// import styled from 'styled-components';

// export const BackButton = styled.button`
//   border: none;
//   color: #007bff;
//   font-size: 16px;
//   cursor: pointer;
//   margin-bottom: 16px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   gap: 5px;
//   background-color: #f0f0f0;
//   width: 100%;
//   padding: 10px;
//   margin-left: 40px;
// `;

// export const Container = styled.div`
//   margin-left: 60px;
//   padding: 1rem;
//   font-family: 'Segoe UI', sans-serif;
// `;

// export const MainQuestion = styled.h2`
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: #1f2937;
//     background-color: #f9fafb;
//     padding: 20px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
// `;

// export const Question = styled.p`
//   font-size: 1rem;
//   font-weight: 400;
//   color: #000000;
//   margin: 0;
// `;

// export const Difficulty = styled.span`
//   background-color: #fee2e2;
//   color: #b91c1c;
//   font-size: 14px;
//   padding: 0.25rem 0.5rem;
//   border-radius: 6px;
// `;

// export const Qusnandeditor = styled.h2`
// display: flex;
//   flex-direction: row;
//   gap: 1rem;
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: #1f2937;
//   position: relative;
//   width: 100%;
// `;

// export const QusnandDesc = styled.div`
//   gap: 1rem;
//   font-size: 16px;
//   font-weight: 600;
//   color: #1f2937;
//   position: relative;
//   width: 40%;
// `;

// export const QuestionBox = styled.div`
//   background-color: white;
//   padding: 1rem;
//   margin-top: 1rem;
//   border: 1px solid #e5e7eb;
//   border-radius: 0.5rem;
// `;

// export const QuestionTitle = styled.h3`
//   font-size: 1rem;
//   font-weight: 600;
//   color: #111827;
// `;

// export const QuestionText = styled.p`
//   margin-top: 0.5rem;
//   color: #374151;
//   line-height: 1.6;
// `;

// export const Description = styled.div`
//   margin-top: 1rem;
//   color: #4b5563;

//   ul {
//     padding-left: 1.25rem;
//   }

//   li {
//     margin-bottom: 0.25rem;
//   }
// `;

// export const HintSection = styled.div`
//   margin-top: 2rem;
//   width: 60%;
// `;

// export const HintHeader = styled.div`
//   font-weight: 600;
//   color: #2563eb;
//   margin-bottom: 0.5rem;
// `;

// export const CodeEditor = styled.div`
//   background-color: #f3f4f6;
//   border: 1px solid #d1d5db;
//   border-radius: 0.5rem;
//   padding: 1rem;
// `;

// export const CodeBlock = styled.pre`
//   font-family: 'Courier New', monospace;
//   font-size: 0.875rem;
//   white-space: pre-wrap;
//   color: #111827;
// `;

















import styled from 'styled-components';
import theme from '../../../../theme/Theme';

export const BackButton = styled.button`
  border: none;
  color: #007bff;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  background-color: #f0f0f0;
  width: 100%;
  padding: 10px;
    padding-left: 60px;

`;

export const Wrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  margin-left: 40px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
   .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    width: 100%;
}
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1000;
  }
 
  .modal-input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    resize: none;
    box-sizing: border-box;
  }
 
  .modal-button {
    padding: 10px 20px;
    background-color: #2290ac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
 
  .modal-cancel-button {
    padding: 10px 20px;
    background: none;
    color: #2290ac;
    border: 1px solid #2290ac;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
 
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    font-size: 28px;
    cursor: pointer;
  }
 
  .button-group{
    display: flex;
    gap: 10px;
    margin-top: 10px;
    justify-content: flex-end;
    width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 1rem;
`;

export const QusnType = styled.h2`
display: flex;
flex-direction: row;
justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 1rem;
    background-color: #e2e3e5;
  padding: 6px;
  border-radius: 5px;
`;

export const QusnText = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  // margin-bottom: 1rem;
  padding: 6px;
`;

export const QusnDifficulty = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  // margin-bottom: 1rem;
   background-color: ${({ difficulty }) =>
    difficulty === 'Easy'
      ? '#d1fae5'      
      : difficulty === 'Medium'
      ? '#fff3cd'     
      : difficulty === 'Hard'
      ? '#f8d7da'     
      : '#e2e3e5'};   
padding: 6px;
`;

export const QuestionContainer = styled.div`
  padding: 1rem;
   width: 40%;
`;

export const QuestionBox = styled.div`
    background-color: #e2e3e5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 16px;
  line-height: 1.6;
  color: #444;
 
`;

export const EditorContainer = styled.div`
  width: 100%;
  height: 800px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #1e1e1e;
  border: 2px solid #2c2c2c;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
 
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;


export const BackIcon = styled.div`
  top: 20px;
  left: 20px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  font-size: 16px;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const TabButton = styled.button`
  padding: 10px 16px;
  border: ${({ active }) => (active ? 'none' : '1px solid #ccc')};
  background-color: ${({ active }) => (active ? '#555' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#777')};
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const TimerText = styled.span`
  color: #2962ff;
  font-size: 13px;
  margin-left: 5px;
`;

export const HintWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const HintButton = styled.button`
  background-color: #e3fcef;
  color: #007e66;
  border: none;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
`;

export const HintTooltip = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  background: #f4f4f4;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  color: #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  white-space: pre-line;
  z-index: 100;
  width: 220px;
`;

export const LanguageSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Select = styled.select`
  padding: 6px 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  font-weight: 500;
  cursor: pointer;
`;