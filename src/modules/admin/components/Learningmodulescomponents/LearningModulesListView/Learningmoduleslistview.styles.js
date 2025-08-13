import styled from "styled-components";
import theme from "../../../../../theme/Theme";

export const ModulesSection = styled.div`
  margin-top: ${theme.spacing(3)};


 

  .module-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing(2)};

    h3 {
      /* font-family: ${theme.fonts.heading}; */
    }
      @media (max-width: ${theme.breakpoints.tablet}) {
        h3 {
          font-size: 1.2rem;
        }
      }
      @media (max-width: ${theme.breakpoints.mobile}) {
      display: flex;
      flex-direction: column;
        h3 {
          font-size: 1rem;
        }
      }
  }

  .module-actions{
display: flex;
gap: 30px;

@media (max-width: ${theme.breakpoints.mobile}) {
gap: 10px;
flex-direction: column;
width: 90%;
}
`;

export const ModuleCard = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.colors.light};
  border-radius: 8px;
  padding: ${theme.spacing(2)};
  margin-bottom: ${theme.spacing(1)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${theme.colors.lightgreen};
    transform: scale(1.01); /* Slightly enlarge the card */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Enhance the shadow on hover */
    z-index: 10;
  }

  .module-image {
    border-radius: 8px;
    width: 64px;
    height: 64px;
    margin-right: ${theme.spacing(2)};
  }

  .module-info {
    flex-grow: 1;

    h4 {
      margin: 0;
      /* font-family: ${theme.fonts.accent}; */

      a {
        text-decoration: none;
        color: inherit; /* Inherit the text color from the parent */
        transition: color 0.2s ease-in-out;

        &:hover {
          color: ${theme.colors.primary}; /* Optional hover effect */
        }
      }
    }

    p {
      color: ${theme.colors.text};
      margin: 4px 0 0;
    }

  }
`;

export const ModuleActions = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};

  .edit-btn {
    background: ${theme.colors.sidebarBgColor};
    border: none;
    cursor: pointer;
    border-radius: 50%;
    padding: 5px;
  }
  .delete-btn {
    background: ${theme.colors.lightpink};
    border: none;
    cursor: pointer;
    border-radius: 50%;
    padding: 5px;

    &:hover {
      background: ${theme.colors.sidebarHoverBgColor};
      border-radius: 4px;
    }
  }
`;



export const NewUploadButton = styled.button`
  background: ${theme.colors.bluetext};
  color: ${theme.colors.light};
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  a {
    text-decoration: none; /* Remove text decoration */
    color: inherit; /* Inherit color from the button */

    &:hover {
      color: inherit; /* Ensure hover color matches */
    }
  }

  &:hover {
    background: ${theme.colors.sidebarHoverBgColor};
    color: ${theme.colors.text};
  }
`;

export const SearchBar = styled.input`
  border: none;
  outline: none;
  /* font-family: ${theme.fonts.body}; */
  font-size: 14px;
  flex: 1;
  background-color: ${theme.colors.sidebarBgColor};


  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.colors.sidebarBgColor};
  padding: 8px 12px;
  border-radius: 4px;
  gap: 8px;
  border: 1px solid ${theme.colors.sidebarHoverBgColor};
    box-sizing: border-box;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
  }
`;
