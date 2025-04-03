// Manage2FA.styles.js
import styled from "styled-components";
import theme from "../../../../theme/Theme";

// Main Container
export const MainContainer = styled.div`
   width: auto;
   padding-left: 60px;

   @media (max-width: 768px) {
    padding-left: 0px;
    `
export const Container = styled.div`
//   width: 100%;
//   border: 1px solid #eee;
  border-radius: 8px;
//   background: #fff;
//   box-shadow: 0 0 8px rgba(0,0,0,0.1);
  padding: 24px;
`;

// Header Section
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h2 {
    margin: 0;
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1rem;
    }
  }
`;

// Status Message
export const StatusMessage = styled.p`
  font-size: 1rem;
  margin-top: 8px;
  color: ${theme.colors.textgray};
  margin-top: 80px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;
export const InstraMessage = styled.p`
  font-size: 1rem;
  margin-top: 8px;
  color: ${theme.colors.textgray};

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

// Button for Add/Disable 2FA
export const ActionButton = styled.button`
  background-color:${theme.colors.info};
  color: ${theme.colors.white};
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color:${theme.colors.bluetext};
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

/* ----------- Modal Styles ----------- */

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: ${theme.colors.white};
  width: 500px;
  max-width: 90%;
  border-radius: 8px;
  padding: 24px;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: ${theme.colors.white};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background:${theme.colors.textgray};
  }
`;

export const Instradiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InstraHeading = styled.p`
  margin-bottom: 4px;
  font-size: 1rem;
  color: ${theme.colors.black};
  font-weight: bold;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
export const InstraPara = styled.p`
  margin-top: 10px;
  font-size: 0.9rem;
  color: ${theme.colors.textgray};

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;
export const InstraBtn = styled.div`
display: flex;
justify-content: center;
 `;