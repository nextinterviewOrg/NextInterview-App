import styled from "styled-components";

import theme from "../../../../../theme/Theme";
export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  padding: ${({ theme }) => theme.spacing(4)};
  //   border: 1px solid ${({ theme }) => theme.colors.borderblue};
  //   border-radius: 8px;
  margin-left: 40px;
  transition: margin-left 0.3s ease-in-out; /* Smooth transition */
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
    border-bottom: 1px dotted #2390ac;
    font-weight: bold;
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
