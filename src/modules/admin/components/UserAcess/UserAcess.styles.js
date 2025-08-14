// NotesTableStyles.js
import styled from "styled-components";

/* Outer container for the entire table section */
export const Container = styled.div`
position: relative;
display: flex;
flex-direction: column;
margin-left: 0px;
margin-top: 0px;
width: 100%;
  padding: 0px 10px 20px 10px;
  background-color: white;
  min-height: 720px;
border-radius: 12px;

@media (max-width: 1024px) {
    margin-left: 0px;
    margin-top: 0;
    padding: 0px;
  }

  @media (max-width: 768px) {
    margin-left: 0px;
    margin-top: 0;
    padding: 0px;
  }

  @media (max-width: 480px) {
    padding: 0px;
  }
`;
/* Header row: top-left title and top-right sort */
export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

/* The title text on the top-left (e.g., "See All Notes (14/24)") */
export const Title = styled.h3`
  margin: 0;
  font-size: 25px;
  // font-weight: 700;
  color: black;


  @media (max-width: 768px) {
    font-size: 1rem;
    margin-left: 10px;
  }
`;

/* Container for "Sort by: Name" on the top-right */
export const SortByContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #ccc;
`;

/* "Sort by:" label */
export const SortLabel = styled.span`
  margin-right: 4px;
`;

/* A <select> for the sort options (e.g., Name, etc.) */
export const SortSelect = styled.select`
  border: 1px solid ${(props) => props.theme.colors.grey};
  background-color: ${(props) => props.theme.colors.backgrounGrey};
  padding: 4px;
  /* font-family: ${(props) => props.theme.fonts.body}; */
  font-size: 12px;
  color: ${(props) => props.theme.colors.test};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

/* Wrapper for the table area (scroll horizontally on small screens) */
export const TableWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  border: none;
  overflow-x: auto;
`;

/* Main table element */
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
    table-layout: fixed; 
    min-width: 1000px;
`;

/* Table head row background */
export const TableHead = styled.thead`
  background: ${(props) => props.theme.colors.sidebarBgColor};
`;

/* Table header cells */
export const TableHeader = styled.th`
  text-align: center;
  padding: 16px;
  /* font-family: ${(props) => props.theme.fonts.heading}; */
  font-size: 16px;
  font-weight:normal;
  color: ${(props) => props.theme.colors.test};
  white-space: nowrap;
  width: auto;


    &:first-child {
  border-top-left-radius: 4px;
}
 
&:last-child {
  border-top-right-radius: 4px;
}
`;

/* Table body */
export const TableBody = styled.tbody`
background: none;
`;

/* Individual table row */
export const TableRow = styled.tr`
  &:hover {
    background-color: ${(props) => props.theme.colors.backgrounGrey};
  }
`;

/* Table cell */
export const TableCell = styled.td`
  padding: 18px;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  vertical-align: center;
    // border-bottom: 1px solid #ccc;
    text-align: center;
    border: 1px solid #F0F8F1;

  /* For multiline text (note description), add these rules if needed */
  &:nth-child(2) {
    max-width: 200px;
    white-space: normal;
  }
  }

  &:first-child {
  border-left:none;
  }
  
  &:last-child {
  border-right:none;
  }


.internaldescription {
  display: inline-block;  /* or block */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;  /* or set a specific width like 150px */
}

`;

/* Container for action icons (edit, delete, etc.) */
export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing(1)};
  font-size: 1rem;

  svg {
    cursor: pointer;
    color: ${(props) => props.theme.colors.test};
    transition: color 0.2s ease;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

/* "Showing X-Y from Z" text */
export const PageInfo = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.test};
`;

export const CreateButton = styled.button`
  padding: 14px;
  margin-top: 10px;
  background: #2290AC;
  color: white;
  border: none;
  border-radius: 4px;
  /* font-family: ${(props) => props.theme.fonts.body}; */
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
  display: flex;
  width: 15%;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    // padding: 8px;
    font-size: 0.9rem;
    width: 25%;
    margin-right: 20px;
  }

  @media (max-width: 480px) {
    padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
    font-size: 0.8rem;
    width: 50%;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
  border-radius: 8px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    margin-left: 10px;
  }

  @media (max-width: 480px) {
    margin-left: 5px;
  }
`;

export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;

`;

export const SearchInput = styled.input`
  padding: 10px 5px 10px 40px; 
  width: 30%;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.silverGray};
  background: #f2f2f2;
  border: 1px solid #ccc;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    width: 100%;
    box-sizing: border-box;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const ModalBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);

  .delete-modal-text{
    text-align: center;
    padding: 10px;
    font-size: 20px;
  }
`;

export const ModalTitle = styled.h3`
  margin-bottom: 16px;
  margin-top: 0;
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
`;

export const Select = styled.select`
   width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 12px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: normal;
  font-size: 16px;

  background-color: ${({ variant }) => 
    variant === "submit" ? "#2290AC" : 
    variant === "delete" ? "#FB4F4F" : "#ccc"};

  color: ${({ variant }) => 
    variant === "submit" ? "#fff" :
    variant === "delete" ? "#fff" : "#333"};


`;



