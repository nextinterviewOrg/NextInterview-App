import styled from "styled-components";
export const DashboardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-left: 50px;
  max-width: 100%;
  // width: 100%;
  background-color: ${(props) => props.theme.colors.light};
  font-family: ${(props) => props.theme.fonts.body};

  .topic-performance {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;

    }
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }

  .user-activity {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 150px;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      margin-top: 100px;
    }
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.heading};
`;
