import styled from "styled-components";
import theme from "../../../../../theme/Theme";

export const TableWrapper = styled.div`
  width: 100%;
  margin: ${theme.spacing(2)} 0;

  @media (max-width: ${theme.breakpoints.tablet}) {
    overflow-x: auto;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  thead {
    background-color: ${theme.colors.light};
    border-bottom: 2px solid ${theme.colors.textgray};
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${theme.colors.light};
  }
`;

export const TableHeader = styled.th`
  padding: ${theme.spacing(1)};
  /* font-family: ${theme.fonts.heading}; */
  font-size: 14px;
  color: ${theme.colors.text};
  text-align: left;
  border-bottom: 1px solid ${theme.colors.textgray};
`;

export const TableCell = styled.td`
  padding: ${theme.spacing(1)};
  /* font-family: ${theme.fonts.body}; */
  font-size: 14px;
  color: ${theme.colors.text};
  text-align: left;

  &:last-child {
    text-align: center;
    color: ${theme.colors.primary};
    font-weight: bold;
  }
`;
