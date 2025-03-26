import styled from "styled-components";
import theme from "../../../../theme/Theme";

export const FlashcardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: ${theme.spacing(3)};
  padding: ${theme.spacing(2)};
  justify-content: center;
  position: relative;
 
 

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
  }
`;
export const FlashContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // gap: ${theme.spacing(1)};
  padding: ${theme.spacing(2)};
 

  
  `;

export const Flashcard = styled.div`
  position: relative;
  gap: ${theme.spacing(1)};
  display: flex;
  flex-direction: column;
  width: 250px;  // Adjust the width of each flashcard
  margin: 0 10px;
  padding: ${theme.spacing(2)};
  background-color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  border-radius: 15px;  
  box-shadow: 0px 4px 10px rgba(8, 8, 8, 0.1);
  transition: transform 0.3s ease, z-index 0.3s ease; // Adding transition for hover effect
  
  &:hover {
    transform: scale(1.1); // Increase the size when hovered
    z-index: 10;  // Bring the hovered card to the front
    // color: ${theme.colors.bluetext};
    background-color: ${theme.colors.lightgreen};
    box-shadow: 0px 4px 10px rgba(8, 8,08, 0.3);
  }

  h4 {
    font-family: ${theme.fonts.heading};
    margin-bottom: ${theme.spacing(1)};
    background-color: ${theme.colors.sidebarBgColor};
    border: 1px solid ${theme.colors.sidebarHoverBgColor};
    width: fit-content;
    padding: ${theme.spacing(0.5)};
    border-radius: 4px;
    color: ${theme.colors.bluetext};
  }

  p {
    font-family: ${theme.fonts.body};
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing(2)};
   
  }

  .actions {
    display: flex;
    gap: ${theme.spacing(1)};
    margin-top: ${theme.spacing(2)};
    justify-content: flex-end;
  }
`;



export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing(2)};
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${theme.spacing(1)};
    align-items: flex-start;
  }
`;

export const SearchBar = styled.input`
  padding: ${theme.spacing(1)};
  font-size: 14px;
  font-family: ${theme.fonts.body};
  border: none;
  background: ${theme.colors.sidebarBgColor};
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.colors.sidebarBgColor};
  padding: 5px 12px;
  border-radius: 4px;
  gap: 8px;
  margin-left: auto;
  border: 1px solid ${theme.colors.sidebarHoverBgColor};

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

export const InteractionStats = styled.div`
  margin-top: ${theme.spacing(1)};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing(2)};
 

  div {
    display: flex;
    gap: ${theme.spacing(1)};
  }

  span {
    font-size: 14px;
    border: 1px solid ${theme.colors.sidebarHoverBgColor};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
    border-radius: 14px;
    background-color: ${theme.colors.light};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;

    span {
      font-size: 12px;
      padding: ${theme.spacing(0.5)};
    }
  }
`;

export const ActionButton = styled.button`
  background-color: ${(props) =>
    props.delete ? theme.colors.lightpink : theme.colors.sidebarBgColor};
  color: ${(props) =>
    props.delete ? theme.colors.darkred : theme.colors.sidebarTextColor};
  border: none;
  border-radius: 50%;
  padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  cursor: pointer;
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;
    padding: ${theme.spacing(0.5)};
  }
`;

export const AddButton = styled.button`
  background-color: ${theme.colors.info};
  color: white;
  border: none;
  border-radius: 4px;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;
    padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  }
`;


export const Image = styled.div`
  width: 100%;
  height: 200px;
  background-image: ${(props) => (props.src ? `url(${props.src})` : 'none')};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`;