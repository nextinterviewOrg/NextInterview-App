import styled from "styled-components";
import theme from "../../../../theme/Theme";

export const Container = styled.div`
  padding: ${theme.spacing(2)};
  /* font-family: ${theme.fonts.body}; */

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(0)};
  }

  h1,
  h3,
  h4 {
    /* font-family: ${theme.fonts.heading}; */
    color: ${theme.colors.text};
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: ${theme.spacing(1)};
    text-align: left;
    border-bottom: 1px solid ${theme.colors.light};
  }

  th {
    background: ${theme.colors.sidebarBgColor};
    color: ${theme.colors.sidebarTextColor}60;
  }

  tr:nth-child(even) {
    background: ${theme.colors.light};
  }
`;

export const ContentWrapper = styled.div`
  margin-left: ${(props) => (props.isExpanded ? "200px" : "60px")};
  padding: 20px;
  // width: calc(100% - ${(props) => (props.isExpanded ? "200px" : "60px")});
  transition: margin-left 0.3s ease, width 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0px;
    padding: 20px;
    width: 90%;
    margin: auto;
  }
`;
