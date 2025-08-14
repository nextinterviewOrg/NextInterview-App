import styled from "styled-components";

export const Container = styled.div`
  margin-left: 60px;
  margin-right: 60px;
margin-top: 50px;
  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

export const SearchBar = styled.input`
background-color: ${({ theme }) => theme.colors.lightgreen};
  width: 35%;
  padding: 12px 16px;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.colors.borderblue};
  border-radius: 6px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.white};
  // margin-top: 50px;
  
`;

export const TableContainer = styled.div`
  width: 100%;
  /* font-family: ${({ theme }) => theme.fonts.body}; */
  margin-top: 20px;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 3fr 1fr;
  background-color: ${({ theme }) => theme.colors.lightgreen};
  padding: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.sidebarTextColor};
`;

export const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 3fr 1fr;
  background-color: ${({ theme }) => theme.colors.lightgreen};
  margin: 12px 0;
  border-radius: 12px;
  padding: 20px;
  align-items: center;
  gap: 20px;
`;

export const Type = styled.div`
  color: ${({ theme }) => theme.colors.textgray};
  font-size: 14px;
`;

export const Question = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;


export const Answer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
    display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Action = styled.div`
  display: flex;
  gap: 12px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ delete: isDelete, theme }) =>
    isDelete ? theme.colors.error : theme.colors.secondary};
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
  margin-right: 10px;
  border-radius: 6px;
  float: right;
  margin-bottom: 16px;
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
  margin-top: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
`;