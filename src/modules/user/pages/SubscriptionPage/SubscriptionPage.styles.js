import styled from "styled-components";

export const UserSubscriptionWrapper = styled.div`
  margin-left: 40px;
  display: flex;
  gap: 10px;
  min-height: 50vh;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
  padding: 20px;

  .subscriptionCardContainer {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 30px;
    width: 100%;
  }

  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 20px;
    
    .subscriptionCardContainer {
      gap: 15px;
    }
  }

  @media (max-width: 480px) {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5vh;
    
    .subscriptionCardContainer {
      flex-direction: column;
      gap: 20px;
    }
  }
`;