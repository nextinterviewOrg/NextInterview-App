// import styled from "styled-components";
// import theme from "../../../../theme/Theme";
// export const PageContainer = styled.div`
//   display: flex;
//   // width: 100%;
//   margin-left: 60px;
//   // flex-direction: row;


// `;

// export const Sidebar = styled.div`
//   width: 20%;
//    border: 1px solid #ddd;
//    height: 90vh;
//    overflow-y: scroll;
//    scrollbar-width: none;
//   background: white;

//   transition: transform 0.3s ease-in-out;
//    position: relative; // Add this for proper positioning context

//    @media (max-width: 860px) {
//      position: fixed;
//      top: 0;
//      left: 0;
//      width: 280px;
//      height: 100vh;
//      z-index: 100;
//      transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(-100%)'};
//      box-shadow: ${({ $isOpen }) => $isOpen ? '2px 0 10px rgba(0,0,0,0.1)' : 'none'};
//    }
// `;

// export const SidebarToggle = styled.button`
//    display: none;
//   position: fixed;
 
//   top: 50%;
//   // left: ${({ $isOpen }) => $isOpen ? 'calc(20% - 20px)' : '0'};
//    z-index: 1001;
//    // background: ${theme.colors.secondary};
//    color: black;
//    width: 40px;
//    border: none;
//    background: transparent;
//    height: 40px;
//    font-size: 20px;
//   cursor: pointer;

//   align-items: center;
//   justify-content: center;
//   // transition: left 0.3s ease-in-out;

//     @media (max-width: 860px) {
//      display: flex;
//      left: ${({ $isOpen }) => $isOpen ? '280px' : '0'};
//    }
//   &:hover {
//      background: ${theme.colors.secondaryDark};
//    }
// `;


// export const Content = styled.div`
//   width: 80%;
//   padding: 20px;
// @media (max-width: 860px) {
//      width: 100%;
//      padding: 20px 10px;
//      margin-left: ${({ $sidebarOpen }) => $sidebarOpen ? '280px' : '0'};
//      transition: margin-left 0.3s ease-in-out;
//    }
//  `;

// export const QuestionHeader = styled.div`
//   font-size: 18px;
//   font-weight: bold;
//   padding: 10px;
//   background: ${theme.colors.lightgreen};
//   border-radius: 5px;


// `;

// export const Option = styled.label`
//   display: block;
//   padding: 10px;
//   margin: 5px 0;
//   cursor: pointer;
//   accent-color: ${theme.colors.bluetext};

//   &:hover {
//     background: #f9f9f9;
//   }
// `;

// export const QuestionContainer = styled.div`
//   // padding: 15px;
//   margin-top: 15px;
//   border: 1px solid ${theme.colors.lightgreen};
//   border-radius: 10px;
// `;

// export const AnswerContainer = styled.div`
//   // padding: 15px;
//   margin-top: 15px;
//   border: 1px solid ${theme.colors.lightgreen};
// `;

// export const Answer = styled.div`
//   // padding: 15px;
//   margin-top: 15px;
//   border: 1px solid ${theme.colors.lightgreen};
// `;

// // Styled Components
// export const Button = styled.button`
//   margin-top: 15px;
//   padding: 10px;
//   background-color: ${theme.colors.secondary};
//   color: ${theme.colors.light};
//   border: none;
//   cursor: pointer;
//   font-size: 16px;
//   border-radius: 5px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: auto;
  

//   &:hover {
//     background-color: ${theme.colors.secondary};
//   }


// `;

// export const FeedbackBox = styled.div`
//   margin-top: 20px;
//   padding: 10px;
//   font-size: 18px;
//   font-style: normal;
//   font-weight: 600;
//   border-radius: 5px;
//   background-color: ${(props) =>
//     props.correct ? `${theme.colors.lightgreen}` : "#fdecea"};
//   color: ${(props) =>
//     props.correct ? `${theme.colors.text}` : `{theme.colors.text}`};
//   display: flex;
//   align-items: center;
//   margin: auto;
//   justify-content: center;

 
// `;

// export const Icon = styled.span`
//   font-size: 18px;
//   margin-right: 8px;
// `;

// export const SolutionBox = styled.div`
//   margin-top: 10px;
//   padding: 15px;
//   border: 1px solid ${theme.colors.secondary};
//   background-color: ${theme.colors.light};
//   border-radius: 8px;

//   .correction {
//     font-size: 18px;
//     margin-right: 8px;
//     cursor: pointer;
//     background-color: #f5f5f5;
//     border-radius: 5px;
//     padding: 10px;

   
//   }

//   .thumbsup {
//     display: flex;
//     justify-content: flex-end;
//     gap: 10px;
//     padding: 5px;
//   }

  
// `;

// export const NextButton = styled(Button)`
//   padding: 10px 20px;
//   margin-top: 15px;
//   color: ${theme.colors.light};
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 24px;
//   font-family: ${({ theme }) => theme.fonts.body};
//   background-color: ${theme.colors.secondary};
//   &:hover {
//     background-color: ${theme.colors.secondary};
//   }

 
// `;

// export const MetaInfo1 = styled.div`
//   font-size: 14px;
//   color: ${({ theme }) => theme.colors.textgray};
//   font-family: ${({ theme }) => theme.fonts.body};

 
// `;

// export const Topic1 = styled.span`
//   font-weight: 600;
//   color: ${({ theme }) => theme.colors.textgray};
//   margin-right: 8px;
//   padding: 4px;
//   line-height: 20px;
// `;

// export const Difficulty1 = styled.span`
//   padding: 4px 8px;
//   font-weight: 600;
//   color: ${({ theme }) => theme.colors.textgray};
//   margin-right: 8px;
//   padding: 4px;
//   border-radius: 12px;
//   line-height: 20px;
// `;

// export const Type1 = styled.span`
//   font-weight: bold;
//   color: ${({ theme }) => theme.colors.graytext};
//   margin-right: 8px;
//   padding: 4px;
//   line-height: 20px;
// `;

// export const Companies1 = styled.span`
//   font-size: 14px;
//   margin-top: 4px;
//   font-family: ${({ theme }) => theme.fonts.body};
//   font-weight: 600;
//   padding: 4px;
//   line-height: 20px;
// `;





import styled from 'styled-components';

export const Container = styled.div`
  // padding: 24px;
  margin: 0;
  width: 98%;
`;

export const BackButton = styled.button`
  border: none;
  color: #007bff;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 16px;
  margin-left: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  background-color: #f0f0f0;
  width: 100%;
  padding: 10px;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

export const QuestionBox = styled.div`
  padding: 0px;
  border-radius: 8px;
  position: relative;
  width: 100%;
  border: 1px solid #f0f0f0;
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
    background: #f5f8fa;
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
  color: #007bff;
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
  color: #007bff;
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
  background-color: #f5f8fa;
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
