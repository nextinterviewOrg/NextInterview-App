import styled from "styled-components";

export const UserSubscriptionWrapper = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 50vh;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .subscription-header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    font-family: "DM Sans";
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
  }

  .current-plan {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    font-family: "DM Sans";
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
  }

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

  
    .nav-button {
      margin-top: 20px;
      background-color: #2290ac;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      padding: 10px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      font-size: 16px;
      font-weight: bold;
      transition: background-color 0.3s ease-in-out;  

    }

    .action-buttons {
      display: flex;
      gap: 10px;
      margin-top: 10px;
      justify-content: center;
      align-items: center;
    }
`;