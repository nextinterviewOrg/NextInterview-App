import styled from "styled-components";

// Container for the entire section
export const PaymentContainer = styled.div`
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

// Header with button
export const PaymentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 25px;
  // font-weight: 700;
  color: black;
  display: flex;
  align-items: center;


  @media (max-width: 768px) {
    font-size: 1rem;
    margin-left: 10px;
  }
`;

export const SubTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  // font-weight: 700;
  color: black;
  margin: 15px 0 ; 


  @media (max-width: 768px) {
    font-size: 1rem;
    margin-left: 10px;
  }
`;



export const CreatePaymentButton = styled.button`
  padding: 14px;
  background: #2290AC;
  color: white;
  border: none;
  border-radius: 4px;
  font-family: ${(props) => props.theme.fonts.body};
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

// Table wrapper
export const TableWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  border: none;
  overflow-x: auto;
`;

// Table styling
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
    table-layout: fixed; 
    min-width: 1000px;
`;

export const TableHead = styled.thead`
  background: ${(props) => props.theme.colors.sidebarBgColor};
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: ${(props) => props.theme.colors.backgrounGrey};
  }
`;

export const TableBody = styled.tbody`
background: none;
`;

export const TableCell = styled.td`
  padding: 18px;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  vertical-align: center;
    // border-bottom: 1px solid #ccc;
    text-align: center;
    border: 1px solid #F0F8F1;

&:nth-child(4) {
  .link {
    color: #2290ac;
    cursor: pointer;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
}
`;

// Optional: in case you're not reusing TableHeader from UserAccess.styles
export const TableHeader = styled.th`
  text-align: center;
  padding: 16px;
  font-family: ${(props) => props.theme.fonts.heading};
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


export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: #fff;
  width: 420px;
  max-width: 90%;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  background: #fff;
  color: #000;
  padding: 12px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h4`
  margin: 0;
  font-size: 18px;
`;

export const ModalClose = styled.span`
  cursor: pointer;
  font-size: 22px;
  line-height: 1;
`;

export const ModalBody = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;

  label {
    font-size: 14px;
    margin-bottom: 6px;
    color: #333;
  }
`;

export const ModalFooter = styled.div`
  padding: 12px 18px 18px 18px;
  display: flex;
  justify-content: flex-end;
`;

/* ---------- inputs ---------- */
export const Input = styled.input`
  padding: 10px;
  border: 1px solid #d7dce1;
  border-radius: 4px;
  font-size: 14px;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #d7dce1;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #d7dce1;
  border-radius: 4px;
  font-size: 14px;
`;