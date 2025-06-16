import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  background-color: #f9fefc;
  font-family: Arial, sans-serif;
  margin-left: 40px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const TopBar = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
  background: ${(props) => props.theme.colors.sidebarBgColor};
  padding: 10px;
  border-radius: 5px;
  flex-direction: row;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 8px 14px;
  border-radius: 5px;
  width: 100%; 
  box-sizing: border-box;
  background: #fff;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 18px;
`;

export const ModuleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  padding: 6px 1%;
`;

export const DropdownIcon = styled.span`
  margin-right: 8px;
  font-size: 12px;
  color: #000;

  .ModuleIncon {
    color: #000;
    font-size: 24px;
    font-weight: 900;
  }
`;

export const StyledSelect = styled.select`
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  appearance: none;
  padding-right: 16px;
  cursor: pointer;

  option {
    font-size: 14px;
    padding: 6px 1%;
  }
`;

// New: CustomSelectWrapper
export const CustomSelectWrapper = styled.div`
  position: relative;
  width: 180px;
  user-select: none;
    appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

// New: CustomSelectBox
export const CustomSelectBox = styled.div`
  border: none;
  outline: none;
  font-size: 14px;
  padding: 10px 14px;
  background: transparent;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 5px;
    appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

// New: CustomOptionsDropdown
export const CustomOptionsDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  width: 100%;
  border: 1px solid #ccc;
  border-top: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 10;
  border-radius: 0 0 5px 5px;
    appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

// New: CustomOption
export const CustomOption = styled.div`
  padding: 10px 14px;
  cursor: pointer;
  font-size: 14px;
    appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover {
    background-color: #f1f1f1;
  }
`;



export const Tabs = styled.div`
  display: flex;
  gap: 20px;
  background-color: ${(props) => props.theme.colors.sidebarBgColor};
  margin-bottom: 15px;
  padding-left: 40px;
  flex-wrap: wrap;
`;

export const Tab = styled.div`
  padding: 10px;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? '#2290ac' : '#333')};
  border-bottom: ${(props) => (props.active ? '3px solid #2290ac' : 'none')};
  cursor: pointer;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  max-width: 100%;

  @media (max-width: 1200px) {
    overflow-x: scroll;
  }
`;

export const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 1fr;
  width: 95%;
  margin: 0 auto;
  min-width: 1000px;
`;

export const TableHeader = styled.div`
  display: contents;
`;

export const TableBody = styled.div`
  display: contents;
`;

export const TableRow = styled.div`
  display: contents;
`;

export const Cell = styled.div`
  padding: 20px;
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
  background: ${(props) => props.theme.colors.sidebarBgColor};
  vertical-align: top;
  word-break: break-word;

  &[header] {
    font-weight: bold;
  }
`;

/* Category Table Styles */
export const TableWrapperCategory = styled.div`
  width: 100%;
  margin-top: 24px;
  overflow-x: auto;
`;

export const TableCategory = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Segoe UI', sans-serif;
    min-width: 600px;
`;

export const TableHeaderCategory = styled.thead`
  background-color: ${(props) => props.theme.colors.sidebarBgColor};
`;

export const TableBodyCategory = styled.tbody``;

export const TableRowCategory = styled.tr`
  border-bottom: 1px solid #e0e0e0;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const TCell = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 14px;
  color: #333;
  background-color:${(props) => props.theme.colors.sidebarBgColor};

  &:first-child {
    width: 20%; /* Adjust width for the first cell */
  }

  &:nth-child(2) {
    width: 40%; /* Adjust width for the second cell */
    text-align: center;
  }

  &:last-child {
    width: 40%; /* Adjust width for the last cell */
  }
`;

export const CellCategory = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: #444;

  a {
    color: #007bff;
    text-decoration: none;
    margin-right: 10px;

    &:hover {
      text-decoration: underline;
    }
  }

  &:first-child {
    width: 20%; /* Adjust width for the first cell */
  }
  &:nth-child(2) {
    width: 40%; /* Adjust width for the second cell */
    text-align: center;
  }
  &:last-child {
    width: 40%; /* Adjust width for the last cell */
  }
`;



export const ActionIcons = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
`;

// Modal styles
export const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 60px 20px 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  // align-items: center;
  gap: 10px;
  width: 350px;
  text-align: center;
  position: relative;
`;


export const CategaryModalContent = styled.div`
  background-color: #fff;
  padding: 20px 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  // align-items: center;
  gap: 10px;
  width: 350px;
  text-align: center;
  position: relative;
`;
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #000;
  background: transparent;
  border: none;
  cursor: pointer;
`;


export const DeleteCloseButton = styled.button`
  font-size: 24px;
  color: #000;
  background: transparent;
  border: none;
  cursor: pointer;
`;


export const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;

`;

export const ModalTextTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  
`;



export const ModelTextHeader  = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 10px;

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:first-of-type {
      background-color: #fff;
      color: #000;
      border: 1px solid #000;
    }

    &:last-of-type {
      background-color: #dc3545;
      color: white;
    }
  }
`;


/* ────────────── “Create Category” modal styles ────────────── */

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const CreateModal = styled.div`
  background: #fff;
  width: 420px;
  max-width: 90%;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
`;

export const CreateModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const CreateModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

export const CreateModalClose = styled.span`
  cursor: pointer;
  font-size: 24px;
  line-height: 24px;
`;

export const CreateModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const CreateModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  display: block;


`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const BtnPrimary = styled.button`
  background: #2290ac;
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

export const BtnSecondary = styled.button`
  background: #f4f4f4;
  color: #333;
  border: 1px solid #ccc;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

/* ────────────── Category table anchor styling ────────────── */

/* If CellCategory already existed, just add the inner a‑tag styles */


export const ActionButtons = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  }
`;

export const AddButton = styled.button`
  background: #2290ac;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;

  &:hover {
    color: #0056b3;
  }
`;

export const RemoveButton = styled.button`
  background: #dc3545;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;




