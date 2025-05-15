import styled from "styled-components";

export const Container = styled.div`
  margin: 50px 60px;
  @media (max-width: 768px) {
    margin: 20px;
  }
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const SearchBar = styled.input`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.borderblue};
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  min-width: 200px;
`;

export const Dropdown = styled.select`
  padding: 10px 14px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.borderblue};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export const TableContainer = styled.div`
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.body};
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr  1fr;
  background-color: ${({ theme }) => theme.colors.lightgreen};
  padding: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.sidebarTextColor};
`;

export const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr  1fr;
  background-color: ${({ theme }) => theme.colors.lightgreen};
  margin: 12px 0;
  border-radius: 12px;
  padding: 20px;
  align-items: center;
`;

export const Type = styled.div`
  color: ${({ theme }) => theme.colors.textgray};
  font-size: 14px;
`;

export const Question = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`;

export const Answer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`;

export const Action = styled.div`
  display: flex;
  gap: 12px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 18px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const AddButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
`;

export const StatusMessage = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
`;
