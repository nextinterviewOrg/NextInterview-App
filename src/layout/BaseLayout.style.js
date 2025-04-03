import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  margin-left: ${(props) => (props.isExpanded ? "200px" : "40px")};
  transition: margin-left 0.3s ease, width 0.3s ease;
  overflow-y: auto;
  width: calc(100% - ${(props) => (props.isExpanded ? "200px" : "40px")});

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;