// AddTOTP.styles.js
import styled from "styled-components";
import theme from "../../../../theme/Theme";

export const TOTPSetupContainer = styled.div`
  padding: 16px;
`;

export const Title = styled.h3`
  margin-top: 0;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  color: #444;
`;

export const QRContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;

export const SecretContainer = styled.div`
  background: #f9f9f9;
  padding: 8px;
  border-radius: 4px;
  margin: 16px 0;
  text-align: center;
  font-family: monospace;

  button {
    margin-left: 8px;
    background-color: #e7e7e7;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 0.8rem;
  }
`;

export const CodeInputsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 16px 0;
`;

export const SingleCodeInput = styled.input`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 1.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color:${theme.colors.bluetext};
    outline: none;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

export const ActionsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;

  button {
    background-color:${theme.colors.info};
    color: #fff;
    border: none;
    padding: 8px 14px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover {
      background-color: ${theme.colors.bluetext};
    }
  }
`;

export const SecondaryButton = styled.button`
  background-color: #ccc !important;
  color: ${({ theme }) => theme.colors.black} !important;
`;
