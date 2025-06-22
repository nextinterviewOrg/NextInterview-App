import styled from "styled-components";
import theme from "../../../../theme/Theme";

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: ${theme.spacing(3)};
  background-color: ${theme.colors.sidebarTextColor}10;
  padding: 10px;
`;

export const LogoutButton = styled.button`
  background-color: ${theme.colors.white};
  color: ${theme.colors.bluetext};
  padding: ${theme.spacing(1.5)};
  border: 1px solid ${theme.colors.bluetext};
  border-radius: 5px;
  cursor: pointer;
  font-family: ${theme.fonts.body};
  font-size: 16px;
  padding: 10px 30px;
  margin-right: 30px;

  &:hover {
    opacity: 0.9;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
  padding: ${theme.spacing(4)};
  background-color: ${theme.colors.white};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 85%;
  margin-left: 10%;
  margin: 40px auto;
  font-family: ${theme.fonts.body};

  @media (max-width: 768px) {
  margin: 0;
  padding: 0 20px;
  }
`;

export const SectionTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.text};
  font-size: 20px;
  text-align: left;
  margin-bottom: ${theme.spacing(3)};

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const ProfilePhoto = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    align-items: center;
  }

  .profilePic {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: ${theme.colors.success}40;
    margin-bottom: ${theme.spacing(1)};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profileicon {
    color: ${theme.colors.white};
  }
`;

export const UploadButton = styled.div`
  width: 120px;
  text-align: center;
  label {
    cursor: pointer;
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.body};
    font-size: 14px;

    input {
      display: none;
    }
  }
`;

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const Label = styled.label`
  font-family: ${theme.fonts.body};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing(0.5)};
  font-size: 14px;
`;

export const InputField = styled.input`
  padding: ${theme.spacing(1)};
  border: 1px solid ${theme.colors.sidebarHoverBgColor};
  border-radius: 5px;
  font-family: ${theme.fonts.body};
  font-size: 14px;
  width: 50%;
  box-sizing: border-box;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    
  }

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
  }
`;

export const SaveButton = styled.button`
  background-color: ${theme.colors.bluetext};
  color: white;
  padding: ${theme.spacing(1.5)};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: ${theme.fonts.body};
  font-size: 16px;
  margin-top: ${theme.spacing(3)};
  width: 10%;
  margin-left: auto;

  @media (max-width: 768px) {
    width: 50%;
    margin: 0;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export const ResetButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: ${theme.fonts.body};
  gap: 10px;
`;

export const ResetButton = styled.button`
  background-color: ${theme.colors.white};
  color: ${theme.colors.bluetext};
  padding: ${theme.spacing(1.5)};
  border: 1px solid ${theme.colors.bluetext};
  border-radius: 5px;
  cursor: pointer;
  font-family: ${theme.fonts.body};
  font-size: 16px;
  width: 20%;

  @media (max-width: 768px) {
  width: 50%;
  }

  &:hover {
    opacity: 0.9;
  }
`;
