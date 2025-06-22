// React Component: ViewedItems.js
import React from "react";
import styled from "styled-components";
import theme from "../../../../theme/Theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const Container = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.backgray};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(2)};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(1)};
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.backgray};
  margin: ${({ theme }) => theme.spacing(2)} 0;
`;

const Label = styled.div`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-weight: 600;
  color: ${({ type, theme }) =>
    type === "most" ? theme.colors.primary : theme.colors.textgray};
  background-color: ${({ type, theme }) =>
    type === "most" ? theme.colors.lightgreen : theme.colors.lightblue};
  padding: ${({ theme }) => theme.spacing(0.5)};
  border-radius: 4px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const InfoTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Info = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textgray};
`;

const ViewedItems = () => {
  return (
    <Wrapper>
      <Title>Topic Performance</Title>
      <Container>
        <Item>
          <Section>
            <Label
              type="most"
              style={{
                color: `${theme.colors.textgray}`,
                backgroundColor: `${theme.colors.lightyellow}`,
              }}
            >
              Most Viewed
            </Label>
            <Details>
              <InfoTitle>AI Basics</InfoTitle>
              <Info>0 hours - 0 users completed</Info>
            </Details>
          </Section>
          <Divider />
          <Section>
            <Label type="least">Least Viewed</Label>
            <Details>
              <InfoTitle>Data Science Basics & Advanced</InfoTitle>
              <Info>0 hours - 0 users completed</Info>
            </Details>
          </Section>
        </Item>
      </Container>
    </Wrapper>
  );
};

export default ViewedItems;
