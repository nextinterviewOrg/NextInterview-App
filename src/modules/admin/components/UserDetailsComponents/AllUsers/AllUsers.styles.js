import styled from "styled-components";
import theme from "../../../../../theme/Theme";


export const Section = styled.div`
  margin-bottom: ${theme.spacing(4)};
  overflow-x: auto;

  h3 {
    font-family: ${theme.fonts.heading};
    margin-bottom: ${theme.spacing(2)};
    color: ${theme.colors.secondary};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  max-width: 800px;
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: ${theme.spacing(1)};
  background: ${theme.colors.primary};
  color: white;
  font-family: ${theme.fonts.heading};
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: ${theme.colors.light};
  }
`;

export const TableCell = styled.td`
  padding: ${theme.spacing(1)};
  border-bottom: 1px solid ${theme.colors.light};
`;

export const UserCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    font-family: ${theme.fonts.body};
    font-size: 14px;
    color: ${theme.colors.text};
  }
`;
