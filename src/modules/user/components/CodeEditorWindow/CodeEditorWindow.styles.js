import styled from 'styled-components';
import theme from '../../../../theme/Theme';

export const BackButton = styled.button`
  border: none;
  color: #2290ac;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  background-color: #F5F5F5;
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

  @media (max-width: 768px) {
      margin-left: 0px;
  }

    .question-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  
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
  background-color: #EDF1F3;
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
border-radius: 5px;
`;

export const QuestionContainer = styled.div`
  padding: 1rem;
   width: 40%;

        @media (max-width: 768px) {
       width:100%;
       padding: 0rem;
     }
`;

export const QuestionBox = styled.div`
    background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 16px;
  line-height: 1.6;
  color: #444;

  .description {
    overflow: auto;
    width: 100%;
  }
 
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
  flex-direction: column;
  // justify-content: space-between;
  // align-items: center;
  margin-bottom: 20px;
  gap: 10px;
`;

export const TabButton = styled.button`
  padding: 10px 16px;
  border: ${({ active }) => (active ? 'none' : '1px solid #ccc')};
  background-color: ${({ active }) => (active ? '#1A1C1E99' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#777')};
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const TimerText = styled.span`
  color: #2962ff;
  font-size: 14px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const HintTooltip = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  color: #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  // white-space: pre-line;
  z-index: 100;
  width: 250px;
`;

export const HintCard = styled.div`
  display: flex;
  align-items: flex-start;
  // background: #f9f9f9;
  // border-radius: 8px;
  // padding: 12px 16px;
  margin-bottom: 10px;
  // box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  gap: 12px;
`;

export const HintIcon = styled.div`
  color: #000;
  margin-top: 4px;
  background-color: #fff3cd;
  border-radius: 50%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const HintContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HintTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

export const HintExplanation = styled.div`
  font-size: 14px;
  color: #555;
`;

export const LanguageSelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const Select = styled.select`
  padding: 6px 12px;
  border-radius: 10px;
  border: none;
  background-color: #f5f5f5;
  font-weight: 500;
  cursor: pointer;
  width: 150px;
`;

export const LanguageSelect = styled.div` 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  width: 90%;
  max-width: 800px;
  border-radius: 10px;
  position: relative;

  /* Hide scrollbar border and make it thin */
::-webkit-scrollbar {
  width: 6px; /* thin scrollbar */
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent; /* no border or background */
}

::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 10px;
  border: none; /* removes scrollbar "border" effect */
}

`;

export const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const ModalButton = styled.button`
  padding: 10px 15px;
  background-color: #2290ac;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #2290ac90
  }
`;

export const FeedbackIcon = styled.div`
  background-color: ${props => props.isHelpful ? '#4CAF50' : '#f44336'};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
`;

export const FeedbackContent = styled.div`
  flex: 1;
`;

export const FeedbackTitle = styled.p`
  margin: 0;
  font-weight: bold;
`;

export const FeedbackMessage = styled.p`
  margin: 5px 0 0 0;
  font-size: 14px;
`;

export const FeedbackCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  color: #666;
`;

export const FeedbackButton = styled.p`
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  transform: ${props => props.isActive ? 'scale(1.2)' : 'scale(1)'};
  color: ${props => props.isActive ? '#2390ac' : 'inherit'};
`;

export const FeedbackIconWrapper = styled.span`
  padding-right: 5px;
  font-size: ${props => props.isActive ? '1.2em' : '1em'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FeedbackPopup = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  max-width: 300px;
  animation: slideIn 0.5s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  /* ✅ Add this spin animation here */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const CardContainer = styled.div`
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
`;

export const TitleforSolution = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 12px 0;
`;

export const Paragraph = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.5;
`;

export const TryHarderLink = styled.a`
  font-size: 14px;
  color: #007bce;
  text-decoration: none;
  display: inline-block;
  margin-top: 8px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 20px;
`;

export const FeedBacks = styled.div`
  display: flex;
  gap: 16px;
`;