import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1rem 3rem 1rem 1rem;

  @media (max-width: 1024px) {
    padding: 1rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const Image = styled.img`
  width: 30%;
  height: 30%;
  border-radius: 8px;
`;

export const Text = styled.p`
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  font-weight: 700;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 10px;
`;

export const ChallengeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0;
      gap: 10px;

  }
`;

export const ChallengeNumber = styled.div`
  font-weight: 400;
  font-size: 32px;
  margin-right: 1rem;
  color: #1A1C1E99;
  width: 5%;

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    margin-right: 1rem;
  }
`;

export const ChallengeDetails = styled.div`
  // flex: 1;
  padding: 0 4rem 0 1rem;
  width: 100%;

  @media (max-width: 1024px) {
    padding: 0 2rem 0 1rem;
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;  

export const ChallengeDate = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 4px;
  font-size: 0.85rem;
  color: #1A1C1E99;
  background-color: #f5f5f5;
  width: 100px;
  font-weight: 400;
  font-size: 12px;
`;

export const ChallengeTitle = styled.h3`
  margin: 0.2rem 0;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.3rem 0;

  @media (max-width: 1024px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    font-weight: 600;
  }
`;

export const ChallengeDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #1A1C1E99;
  margin: 0.2rem 0;
  line-height: 1.4;
  word-spacing: 2px;

  @media (max-width: 1024px) {
    font-size: 14px;
    word-spacing: 1px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
  word-spacing: 0px;
  line-height: 1.2;
  }
`;

export const Status = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100px;
  font-size: 12px;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  font-weight: 400;
  background-color: ${(props) =>
    props.status === "Completed" ? "#efffeb" : "#ffebeb"};
  color: ${(props) =>
    props.status === "Completed" ? "#68c184" : "#843838"};
  border: 1px solid
    ${(props) =>
      props.status === "Completed" ? "#defcd6" : "#fcd6d6"};

      @media (max-width: 1024px) {
        font-size: 0.7rem;
        width: 80px;
      }

      @media (max-width: 480px) {
        font-size: 0.6rem;
        width: 100px;
        margin-left: 0.5rem;
      }
`;
