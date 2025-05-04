import styled from "styled-components";

import theme from "../../../../../theme/Theme";
export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  padding: ${({ theme }) => theme.spacing(4)};
  margin-left: 40px;
  transition: margin-left 0.3s ease-in-out; /* Smooth transition */

  @media (max-width:768px) {
    margin-left: 0px;
  }
`;

export const TryItYourself = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const TryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.bluetext};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border: 1px solid ${({ theme }) => theme.colors.bluetext};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.body};
  cursor: pointer;
  margin-right: ${({ theme }) => theme.spacing(1)};
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bluetext};
    color: ${({ theme }) => theme.colors.white};
  }
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

// export const ModalContent = styled.div`
//   padding: 20px;
//   width: 500px;
//   border-radius: 10px;
//   margin: 0 auto;
// `;

export const ModalContent = styled.div`
  position: relative;
  // background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  // max-width: 400px;
  width: 90%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const CCModalContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.4px;
`;

export const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

// export const Text = styled.p`
//   color: ${({ theme }) => theme.colors.text};
//   margin-top: ${({ theme }) => theme.spacing(1)};
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 24px; /* 150% */
//   letter-spacing: -0.32px;
//   overflow: hidden;
// `;

// Combined Text component with concept tooltip styles
export const Text = styled.div`
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing(1)};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.32px;
  overflow: hidden;
  position: relative;

  .concept-tooltip {
    color: #2390ac;
    cursor: pointer;
    border-bottom: 2px dotted #2390ac;
    font-weight: 500;
    padding: 2px 4px;
    transition: all 0.2s ease;
    background-color: rgba(35, 144, 172, 0.1);
    border-radius: 4px;
  }

  .concept-tooltip:hover {
    background-color: rgba(35, 144, 172, 0.2);
  }
`;

export const Image = styled.img`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(2)};
  border: 1px solid ${({ theme }) => theme.colors.borderblue};
  border-radius: 8px;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border: none;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.body};
  cursor: pointer;
  margin-right: ${({ theme }) => theme.spacing(1)};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const SummaryContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  padding: ${({ theme }) => theme.spacing(0.5)};
  padding-top: 0px;
  transition: margin-left 0.3s ease-in-out;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

export const SummaryTitle = styled.h4`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: bold;
  padding: 0px 0px 10px 0px;
  padding-left: 20px;
`;

export const SummaryText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing(1)};
  line-height: 1.2;
  padding-left: 20px;
`;

export const ButtonGroup = styled.div`
  //   display: flex;
  //   justify-content: flex-end;
  // //   align-items: center;
  //   margin-top: ${({ theme }) => theme.spacing(3)};
  // //   gap: 12px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

export const ConceptHighlight = styled.span`
  background-color: ${({ theme }) => theme.colors.warningLight};
  border-bottom: 1px dashed ${({ theme }) => theme.colors.secondary};
  cursor: help;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.warning};
  }
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
