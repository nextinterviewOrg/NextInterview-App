import styled from "styled-components";

export const UserSubscriptiontt = styled.div`
  margin-left: 40px;
  display: flex;
  gap: 10px;
  /* height: 50vh; */
  justify-content: center;
  align-items: center;
  margin-top: 1px;
  flex-direction: column;

  .subscriptionCardContainer {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 30px;
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
}
`;

export const SkipButton = styled.button`
    padding: 10px 20px;
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
        background-color: #e0e0e0;
    }
`;

export const SubLogoutButton = styled.button`
  background-color: #ffffff;
  color: #2290ac;
  border: 1px solid #2290ac;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: darken(#DA2C43, 10%);
  }
`;
