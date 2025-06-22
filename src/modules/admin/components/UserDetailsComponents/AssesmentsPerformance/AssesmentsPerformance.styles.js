import styled from "styled-components";
import theme from "../../../../../theme/Theme";

export const TableWrapper = styled.div`
  width: 100%;
  margin: ${theme.spacing(2)} 0;
  overflow-x: auto;

  h3 {
    font-family: ${theme.fonts.heading};
    font-size: 18px;
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing(2)};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  max-width:800px;

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
  font-family: ${theme.fonts.heading};
  font-size: 14px;
  color: ${theme.colors.text};
  text-align: left;
  border-bottom: 1px solid ${theme.colors.textgray};

  span {
    font-size: 12px;
    color: ${theme.colors.textgray};
    margin-left: 4px;
    cursor: pointer;
  }
`;

// export const TableCell = styled.td`
//   padding: ${theme.spacing(1)};
//   font-family: ${theme.fonts.body};
//   font-size: 14px;
//   color: ${theme.colors.text};
//   text-align: left;

//   &.highlight {
//     color: ${theme.colors.primary};
//     font-weight: bold;
//   }
// `;

export const TableCell = styled.td`
  padding: ${theme.spacing(1)};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  color: ${theme.colors.text};
  text-align: left;

  a {
    text-decoration: none; /* Remove text decoration */
    color: inherit; /* Inherit the text color from the parent */

    &:hover {
      color: ${theme.colors.primary}; /* Optional hover effect for better interactivity */
    }
  }

  &.highlight {
    color: ${theme.colors.primary};
    font-weight: bold;
  }
`;
