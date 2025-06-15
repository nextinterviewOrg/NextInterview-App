import styled from "styled-components";
import theme from "../../../../theme/Theme";  

export const Container = styled.div`
  margin-left: 60px;
    margin-right: 30px; 
  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

export const Title = styled.h3`
    font-size: 20px;
    font-weight: 500;
    margin: 1.5rem 0;
    color: #333;
    @media (max-width: 768px) {
        font-size: 18px;
    }
`;


export const TimeFilters = styled.div`
  display: flex;
  gap: 0.75rem;

  button {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    border: none;
    background: #e6e6e6;
    color: #333;
    cursor: pointer;

    &.active {
      background: #333;
      color: white;
    }
  }
`;

export const SummaryGrid = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1.5rem 0 2rem;
`;

export const SummaryCard = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  flex: 1;

  h4 {
    font-size: 14px;
    color: #777;
  }

  p {
    font-size: 24px;
    font-weight: 600;

    .green {
      color: green;
      font-size: 14px;
      margin-left: 8px;
    }

    .red {
      color: red;
      font-size: 14px;
      margin-left: 8px;
    }
  }

  small {
    font-size: 12px;
    color: #aaa;
  }
`;

export const SearchSortRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  .search {
    display: flex;
    align-items: center;
    background: #F0F8F1;
    border-radius: 8px;
    padding: 0.5rem 1rem;

    svg {
      color: #888;
      margin-right: 0.5rem;
    }

    input {
      border: none;
      background: transparent;
      outline: none;
    }
  }

  select {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background: #f3f3f3;
  }
`;

export const InvoiceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #F0FFF0;
  border-radius: 10px;
  overflow: hidden;
`;

export const Th = styled.th`
  text-weight: normal;
  text-align: left;
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.lightgreen};
  color: ${({ theme }) => theme.colors.textgray};
  border: 1px solid #ebfced;
`;

export const Tr = styled.tr`
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.lightgreen : theme.colors.light};
  cursor: pointer;
  border: 1px solid #ebfced;
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderblue};
  text-align: left;
  border: 1px solid #ebfced;

  &:last-child {
    align-items: center;
}
`;

export const UserCell = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.lightgreen};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.black};
  margin-right: ${({ theme }) => theme.spacing(1)};
`;
export const ModeCell = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.black};
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

export const StatusBadge = styled.p`
  padding: 0.25rem 0.75rem;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ status }) =>
    status === "captured"
      ? "#00AC4F"    
      : status === "failed"
      ? "#D0004B"
      : "#926F24"};
  background-color: ${({ status }) =>
    status === "captured"
      ? "#F0F8F1"
      : status === "failed"
      ? "#FFEBEB"
      : "#FFEBCA"};
      text-align: center;
      width:50%;
      margin: 0 auto;
`;

export const Pagination = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 14px;
  margin-bottom: 2rem;

  span {
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    cursor: pointer;

    &.active {
      background: #2290AC;
      color: white;
    }

    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }
`;

export const Wrapper = styled.div`
display: flex;
justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;
 
export const Header = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;
 
export const Tabs = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
`;
 
export const Tab = styled.button`
  background-color: ${({ active }) => (active ? '#333' : '#eee')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 1rem;
  cursor: pointer;
  font-weight: 500;
`;
 
export const CardsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;
 
export const Card = styled.div`
  flex: 1;
  display: flex;
//   flex-direction: row;
  gap: 20px;
  min-width: 250px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0.05,0,0,0.09);
  padding: 1.5rem;
`;
 
export const CardDesc = styled.div`
  background-color: #fff;
  border-radius: 12px;
  gap: 8px;
`;

export const IconCircle = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.2rem;

  background-color: ${({ iconType }) => {
    switch (iconType) {
      case "transaction":
        return "#F0F8F1";
      case "people":
        return "#F8EEFF";
      case "sales":
        return "#EEF1FB";
      default:
        return "#ddd";
    }
  }};

  color: ${({ iconType }) => (iconType === "people" ? "#57209B" : "#000")};
`;

 
export const CardTitle = styled.div`
  font-size: 0.95rem;
  color: #888;
  margin-bottom: 0.5rem;
`;
 
export const Value = styled.div`
  font-size: 28px;
  font-weight: 700;
`;
 
export const Comparison = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;
 
export const SubText = styled.div`
  font-size: 0.8rem;
  color: #888;
`;
 
export const SubTitle = styled.div`
display: flex;
flex-direction: row;
margin-top: 10px;
align-items: center;
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.5rem;
 
  .line {
    width: 2px;
    height: 12px;
    background-color: #ccc;
    margin: 0 5px;
  }
`;
 
export const SubNumber = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;
 
export const ChangeText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  color: ${({ isPositive }) => (isPositive ? '#067c4f' : '#b00020')};
  background-color: ${({ isPositive }) => (isPositive ? '#e6f4ea' : '#fdecea')};
`;